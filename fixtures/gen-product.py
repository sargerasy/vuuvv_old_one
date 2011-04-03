"""
Basically just an API wrapped around Douglas Savitsky's code from http://www.ecp.cc/pyado.html
Recordset iterator taken from excel.py in Nicolas Lehuen's code from http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/440661
"""
AD_OPEN_KEYSET = 1
AD_LOCK_OPTIMISTIC = 3
import win32com.client
import json

class AccessDb(object):
	"""An Access connection"""    
	def connect(self, data_source, user, pwd, mdw):
		"""Returns a connection to the jet database
		NB use .Close() to close (NB title case unlike closing a file)"""
		connAccess = win32com.client.Dispatch(r'ADODB.Connection')
		# DSN syntax - http://support.microsoft.com/kb/193332 and http://www.codeproject.com/database/connectionstrings.asp?df=100&forumid=3917&exp=0&select=1598401
		DSN = "PROVIDER=Microsoft.Jet.OLEDB.4.0;DATA SOURCE=%s;" % data_source#USER ID=%s;PASSWORD=%s;Jet OLEDB:System Database=%s;" % (data_source, user, pwd, mdw)
		#print DSN
		connAccess.Open(DSN)
		return connAccess

	def getRecordset(self, connAccess, SQL_statement):
		return Recordset(connAccess, SQL_statement)

class Recordset(object):
	"""Recordset created from a query"""
	def __init__ (self, connAccess, SQL_statement):
		rs = win32com.client.Dispatch(r'ADODB.Recordset')
		rs.Open(SQL_statement, connAccess, AD_OPEN_KEYSET, AD_LOCK_OPTIMISTIC)
		self.rs = rs

	def getFields(self):
		"""Get list of field names"""
		fields = [field.Name for field in self.rs.Fields]
		return fields

	def __iter__(self):
		""" Returns a paged iterator by default. See paged().
		"""
		return self.paged()

	def paged(self,pagesize=128):
		""" Returns an iterator on the data contained in the sheet. Each row
			is returned as a dictionary with row headers as keys. pagesize is
			the size of the buffer of rows ; it is an implementation detail but
			could have an impact on the speed of the iterator. Use pagesize=-1
			to buffer the whole sheet in memory.
		"""
		try:
			fields = self.getFields()
			#fields = [self.encoding(field.Name) for field in recordset.Fields]
			ok = True
			while ok:
				# Thanks to Rogier Steehouder for the transposing tip 
				rows = zip(*self.rs.GetRows(pagesize))

				if self.rs.EOF:
					# close the recordset as soon as possible
					self.rs.Close()
					self.rs = None
					ok = False

				for row in rows:
					yield dict(zip(fields, row))
		except:
			if self.rs is not None:
				self.rs.Close()
				del self.rs
			raise

accessdb = AccessDb()
connAccess = accessdb.connect("Database.mdb", "", "", "")
 
SQL_statement = "SELECT * FROM 35_Pro_Class"
rs = accessdb.getRecordset(connAccess, SQL_statement)
fields = rs.getFields()
print fields
 
lookup = {}
collection = []
i = 1
for item in rs:
	myobj = {}
	myobj["model"] = "main.Product"
	myobj["pk"] = i
	myobj["fields"] = {}
	myobj["fields"]["name"] = item["Topic"]
	myobj["fields"]["decorator"] = item["Content"]
	myobj["fields"]["order"] = item["OrderID"]
	myobj["fields"]["thumbnail"] = "/media/upload/images/products/" + item["Spic"]
	myobj["fields"]["image"] = "/media/upload/images/products/" + item["Bpic"]
	myobj["fields"]["is_category"] = True

	myobj["fields"]["parent"] = None
	pid = int(item["Roodid"].split(",")[-1])
	if pid:
		myobj["fields"]["parent"] = lookup[pid]
	lookup[item["ID"]] = i

	collection.append(myobj)
	print i, item["ID"], pid, myobj["fields"]["parent"]
	i = i + 1
connAccess.Close()

connAccess = accessdb.connect("Database.mdb", "", "", "")
 
SQL_statement = "SELECT * FROM 35_Product"
rs = accessdb.getRecordset(connAccess, SQL_statement)
fields = rs.getFields()

for item in rs:
	myobj = {}
	myobj["model"] = "main.Product"
	myobj["pk"] = i
	myobj["fields"] = {}
	myobj["fields"]["name"] = item["Topic"]
	myobj["fields"]["decorator"] = None
	myobj["fields"]["order"] = item["OrderID"]
	myobj["fields"]["thumbnail"] = "/media/upload/images/products/" + item["DefaultPic"]
	myobj["fields"]["image"] = "/media/upload/images/products/" + item["DefaultPic1"]
	myobj["fields"]["is_category"] = False

	myobj["fields"]["parent"] = None
	pid = lookup.get(int(item["ClassID"]), None)
	if pid:
		myobj["fields"]["parent"] = pid
	#lookup[item["ID"]] = i

		collection.append(myobj)
	print i, item["ID"], pid, myobj["fields"]["parent"]
	i = i + 1
connAccess.Close()

f = open("product.json", "w")
f.write(json.dumps(collection))
f.close() 

#conn = win32com.client.Dispatch("ADODB.Connection")
#db = r"Database.mdb"
#DSN = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + db
#conn.Open(DSN)
#
#rs = win32com.client.Dispatch("ADODB.Recordset")
#rs.Open("[35_News]", conn, 1, 3)
#
#cmd = win32com.client.Dispatch("ADODB.Command")
#cmd.ActiveConnection = conn
#
#print rs.Fields.Count

