-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2011 年 03 月 25 日 09:22
-- 服务器版本: 5.1.53
-- PHP 版本: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `lookooo`
--

-- --------------------------------------------------------

--
-- 表的结构 `main_page`
--

CREATE TABLE IF NOT EXISTS `main_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `url` varchar(255) NOT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `content` longtext NOT NULL,
  `template` varchar(100) NOT NULL,
  `created_by` varchar(70) NOT NULL,
  `changed_by` varchar(70) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `main_page`
--

INSERT INTO `main_page` (`id`, `title`, `url`, `keywords`, `desc`, `content`, `template`, `created_by`, `changed_by`, `creation_date`) VALUES
(1, 'Management', 'corp/management', '', '', '<div class="right-content">\n<h5 class="tit"> </h5>\n<div align="left" style="line-height:20px;padding-top:15px;"><ul class="managelist clearfix">\n    <li>\n    <div class="managepic"><img height="124" width="115" src="/media/upload/images/manager/managepic01.png" />\n    <h6>Jianshe Cai</h6>\n    </div>\n    <div class="managedetail">\n\n    <h5>Jianshe Cai (57), Founder, CEO and Board Chairman</h5>\n    <p><img src="/media/images/arrow04.gif" /> Founder and CEO of Quanzhou Joyou Sanitation Technology Industrial Co., Ltd. and Joyou Building Material Group for 30 years</p>\n    <p><img src="/media/images/arrow04.gif" /> Chairman of Sanitary Ware &amp; Valves Industry Association, Fujian Province since 2005</p>\n    <p><img src="/media/images/arrow04.gif" /> Deputy Chairman of Sanitary Ware Association of China</p>\n\n    <p><img src="/media/images/arrow04.gif" /> Chairman of Furniture &amp; Decoration Chamber of Commerce</p>\n    <p><br />\n     </p>\n    </div>\n    </li>\n    <li>\n    <div class="managepic"><img height="124" width="115" src="/media/upload/images/manager/managepic02.png" />\n\n    <h6>Jilin Cai</h6>\n    </div>\n    <div class="managedetail">\n    <h5>Jilin Cai (32), Chief Operating Officer (COO)</h5>\n    <p><img src="/media/images/arrow04.gif" /> Business Administration at Fujian Normal University</p>\n    <p><img src="/media/images/arrow04.gif" /> Extensive management experience with Joyou Sanitation TechnologyIndustrial Co., Ltd. and Joyou Building Material Group since 1997</p>\n\n    <p><img src="/media/images/arrow04.gif" /> Executive Manager in Beijing subsidiary of Joyou Group (1997-2007)</p>\n    <p><img src="/media/images/arrow04.gif" /> Deputy Secretary General of Fujian Sanitary Ware and Valve Industry Association since 2007</p>\n    <p><img src="/media/images/arrow04.gif" /> Chairman of Water Heating Section, Chinese Hardware Industry Association since 2008</p>\n    <p><br />\n     </p>\n    </div>\n\n    </li>\n    <li>\n    <div class="managepic"><img height="124" width="115" src="/media/upload/images/manager/managepic03.png" />\n    <h6>Gang Zheng</h6>\n    </div>\n    <div class="managedetail">\n    <h5>Gang Zheng (40), Chief Financial Officer (CFO)</h5>\n    <p><img src="/media/images/arrow04.gif" /> BS, Industrial Management, Xiamen University (1992); MBA, Columbia Business School (1998)</p>\n\n    <p><img src="/media/images/arrow04.gif" /> Associate Investment banking, China International Trust and Investment Corporation (CITIC) (1996-1997)</p>\n    <p><img src="/media/images/arrow04.gif" /> Senior Financial Analyst, General Motors (1998-1999)</p>\n    <p><img src="/media/images/arrow04.gif" /> Finance Manager, Asia Pacific, Delphi Corporation Dynamics and Propulsion System (1999-2002)</p>\n    <p><img src="/media/images/arrow04.gif" /> Vice President, Sichuan Small Investment Fund (2002-2003)</p>\n    <p><img src="/media/images/arrow04.gif" /> Director of China New Business Development, W.R. Grace (2005-2007)</p>\n\n    <p><br />\n     </p>\n    </div>\n    </li>\n    <li>\n    <div class="managepic"><img height="124" width="115" src="/media/upload/images/manager/managepic05.png" />\n    <h6>Zufang Li</h6>\n    </div>\n\n    <div class="managedetail">\n    <h5>Zufang Li (51), Chief Accounting Officer (CAO)</h5>\n    <p><img src="/media/images/arrow04.gif" /> Associate degree in finance at Fujian Radio and Television University</p>\n    <p><img src="/media/images/arrow04.gif" /> Longstanding accounting experience</p>\n    <p><img src="/media/images/arrow04.gif" /> Worked in the accounting departments of various industrial corporations: Nan''''''''''''''''an Shishan Town Co., Ltd., Nanshun Electronics Co., Ltd., Nan''''''''''''''''an Yifeng Paper Co., Nan''''''''''''''''an Jiutian Umbrella Co., Nan''''''''''''''''an Wah Hing Umbrella Co., Xiamen Minghe Industrial Corporation</p>\n\n    <p><img src="/media/images/arrow04.gif" /> With Joyou as Financial Manager since 1991</p>\n    <p><br />\n     </p>\n    </div>\n    </li>\n    <li>\n    <div class="managepic"><img height="124" width="115" src="/media/upload/images/manager/managepic04.png" /> \n    <h6>Ian M. Oades</h6>\n\n    </div>\n    <div class="managedetail">\n    <h5>Ian M. Oades (43), Head of Investor Relations</h5>\n    <p><img src="/media/images/arrow04.gif" /> MBA International CEIBS, China, &amp; Warwick Business School, UK (2002); two undergraduates in Industrial Management (1992) and Engineering (1988)</p>\n    <p><img src="/media/images/arrow04.gif" /> Founder of Financial Consultancy in China, assisting Chinese SMEs to successfully list abroad (2004-2009)</p>\n\n    <p><img src="/media/images/arrow04.gif" /> Author of the book ''''''''''''''''IPO. A guide for Chinese SMEs Seeking International Capital'''''''''''''''' published by CITIC Publishing (2007)</p>\n    <p><img src="/media/images/arrow04.gif" /> Regular guest speaker with China Law Society, &amp; MOFCOM on M&amp;A law and International Capital Markets</p>\n    <p><img src="/media/images/arrow04.gif" /> Guest lecturer at FudanUniversity, and Lyon University (Shanghai)</p>\n    <br />\n\n    <br />\n    <br />\n    <p>Supervisory Board: Dr. Rainer Simon (Chairman), Mr. Johnny Chen, Mr. Wei Wang</p>\n    </div>\n    </li>\n</ul></div>\n</div>', 'normal', '1', '1', '2011-03-25 11:40:37'),
(2, 'Corporate Overview', 'corp/overview', '', '', '<p><br />\n </p>\n<script type="text/javascript" src="/Js/swfobject.js"></script>\n<div style="text-align:center;">\n<p id="player2"><embed height="400" width="500" type="application/x-shockwave-flash" src="/flash/flvplayer.swf" id="playlist" name="playlist" quality="high" allowfullscreen="true" flashvars="file=/xml/playlist.xml&displayheight=330&autostart=false&backcolor=0x333333&frontcolor=0xffffff&lightcolor=0xcccccc" /></p>\n<script type="text/javascript">\n	var s2 = new SWFObject(&amp;amp;amp;quot;/flash/flvplayer.swf&amp;amp;amp;quot;,&amp;amp;amp;quot;playlist&amp;amp;amp;quot;,&amp;amp;amp;quot;500&amp;amp;amp;quot;,&amp;amp;amp;quot;400&amp;amp;amp;quot;,&amp;amp;amp;quot;1&amp;amp;amp;quot;);\n	s2.addParam(&amp;amp;amp;quot;allowfullscreen&amp;amp;amp;quot;,&amp;amp;amp;quot;true&amp;amp;amp;quot;);\n	s2.addVariable(&amp;amp;amp;quot;file&amp;amp;amp;quot;,&amp;amp;amp;quot;/xml/playlist.xml&amp;amp;amp;quot;);\n	s2.addVariable(&amp;amp;amp;quot;displayheight&amp;amp;amp;quot;,&amp;amp;amp;quot;330&amp;amp;amp;quot;);\n	s2.addVariable(&amp;amp;amp;quot;autostart&amp;amp;amp;quot;,&amp;amp;amp;quot;false&amp;amp;amp;quot;);\n	s2.addVariable(&amp;amp;amp;quot;backcolor&amp;amp;amp;quot;,&amp;amp;amp;quot;0x333333&amp;amp;amp;quot;);\n	s2.addVariable(&amp;amp;amp;quot;frontcolor&amp;amp;amp;quot;,&amp;amp;amp;quot;0xffffff&amp;amp;amp;quot;);\n	s2.addVariable(&amp;amp;amp;quot;lightcolor&amp;amp;amp;quot;,&amp;amp;amp;quot;0xcccccc&amp;amp;amp;quot;);\n	s2.write(&amp;amp;amp;quot;player2&amp;amp;amp;quot;);\n</script></div>\n<p><br />\n </p>\n<h1>About Us</h1>\n<p><br />\n </p>\n<ul class="aboutpic">\n    <li><img height="112" width="140" src="/upload//about_pic01.jpg" /></li>\n\n    <li><img height="112" width="140" src="/upload//about_pic02.jpg" /></li>\n</ul>\n<p>Joyou AG is listed in the Prime Standard of the Frankfurt Stock Exchange, trading under the ticker symbol JY8.</p>\n<p> </p>\n<p>Joyou designs, produces and sells faucets and other sanitary ware products. The main product groups sold in its own brand business are bathroom faucets, kitchen products, shower products, other bathroom products and other faucets and sanitary hardware.</p>\n<p>Joyou sells its products in China under its brand name and is supplier for international sanitary ware companies, wholesalers and trading companies in the United States and Europe as well as certain emerging markets.</p>\n<p>Joyou has established an extensive retail distribution network in China. The operating facilities including its two production facilities are based in Nan''''an in the Fujian Province in China.</p>\n<p> </p>\n<p><b>The Joyou retail network consists of more than 3,516 points of sale in China.</b></p>\n<p style="text-align:center;"><img src="/images/aboutus_map.jpg" /></p>\n<p><br />\n\n<br />\n<br />\nJoyou AG is listed in the Prime Standard of the Frankfurt Stock Exchange, trading under the ticker symbol JY8.</p>', '', '1', '1', '2011-03-25 16:41:03'),
(3, 'Environmental Responsibility', 'corp/env_responsibility', '', '', '<b><font face="Arial">Environmental \n    Responsibility</font></b><p><font face="Arial">We are committed to \n    environmental protection, an fulfillment of environmental responsibilities.\n    With an increasing awareness of environmental issues, and as national and \n    international regulatory bodies impose increasingly strict environmental \n    standards on the production of sanitary ware products, We place strong \n    emphasis on the production of more environmentally friendly products, \n    including water conservation measures, production methods, as well as the \n    components used for our products. We have long worked to improve water \n    conservation measures, such as the prevention of leakage in our valves and \n    toilet flushes enabling the user to control the amount of flushing water.</font></p>\n    <p><font face="Arial"><b>Environmental \n    Certification</b><br />\n    We have received certifications from independent bodies such as the \n    international certification network IQNet with respect to the fulfillment of \n    ISO14001:2004 for environmental management and ISO 9001:2000 for quality \n    management set up by the International Organization for Standardization.</font></p><p>\n    <font face="Arial"><b>Environment-Friendly Products</b><br />\n    We received the &quot;Water-and-Energy-Saving Product&quot; award from the Chinese \n    Certification Center for<br />\n    Energy conservation products in 2003. Further, we also focus on \n    research in the production of lead-free faucets, energy and water saving \n    features.</font></p><p><font face="Arial">\n\n    <b>Regulatory Requirements Pertaining to the Discharge of Waste</b><br />\n    In relation to the treatment of air pollutants and waste effluents created \n    during the production process, Joyou has to comply with the Environmental \n    Protection Law of the PRC, the regulations of the State Council issued \n    thereunder, the Law of the PRC on the Prevention and Treatment of Water \n    Pollution, the Law of the PRC on the Prevention and Treatment of Air \n    Pollution, the Law of the PRC on the Prevention and Control of Environmental \n    Pollution by Solid Wastes and the environmental rules promulgated by the \n    local government of Fujian Province where Joyou''s production facilities are \n    located. In China, MEP implements unified supervision and management of \n    national environmental protection. The environmental protection bureaus at \n    or above the county level are responsible for the environmental \n    administration within their respective jurisdictions.<br />\n    According to the national environmental laws, MEP (Ministry of Environmental \n    Protection) sets national standards for pollutants emission and local \n    environmental protection bureaus may set stricter local standards. \n    Enterprises are required to comply with the stricter of the two standards.</font></p><p>\n    <font face="Arial">*ISO 14001 is an environmental management standard set by \n    the International Organization for Standardization. Its purpose is to help \n    organizations to comply with applicable laws, regulations, and other \n    environmentally oriented requirements. ISO 14001 is the standard against \n    which organizations are assessed.</font></p><p>　</p>', '', '1', '1', '2011-03-25 16:43:12'),
(4, 'Culture', 'corp/culture', '', '', '<p><font face="Arial">\n    <span class="long_text" id="result_box">\n    <span style="font-weight:700;background-color:rgb(255, 255, 255);">\n    <font size="3">Corporate Culture</font></span></span></font></p><p>\n    <font face="Arial">Joyou AG has \n    over 2,000 employees, all of whom are graduates of \n    universities, colleges, or technical collegaes. We pay great attention to the living and working \n    conditions of every member of our staff, regularly performing independent as \n    well as the governmental checks and audits. Staff members are encouraged to \n    develop their professional skills through various training classes conducted \n    by the company Joyou AG also has incentive schemes in place \n    to reward employees that help boost productivity.</font></p><p><font face="Arial">\n    <i>The core cultural concept:</i> the core cultural concept is to build a people-oriented \n    enterprise as a technology leader.</font></p><p><font face="Arial"><i>\n\n    Entrepreneurialism</i>: we encourage all our staff to keep the enterprise''s \n    entrepreneurialism spirit<br />\n    <br />\n    <i>Corporate values:</i> to create a sustainable operational platform for \n    the long-term development of \n    enterprises, thereby creating opportunities for our employees and the \n    community as a whole. <br />\n    <br />\n    <i>Employment concept</i>: respect for people and nurture their talent <br />\n\n    　</font></p>', '', '1', '1', '2011-03-25 16:46:27'),
(5, 'Milestones', 'corp/milestone', '', '', '<span style="font-weight:700;background-color:rgb(255, 255, 255);">\n    <font face="Arial">Milestones</font></span><p></p><p><font face="Arial"><b>\n    2010</b>: Joyou starts the building of new ceramics factory</font></p><p>\n    <font face="Arial"><b>2010</b>: Joyou AG listed in the Frankfurt stock \n    exchange in Germany, with the largest capital increase for a Chinese company \n    listed in Germany</font></p><p><font face="Arial"><b>2009</b>: Distribution \n    network with over 2,500 retail points of sale and own brand products account \n    for approximately 73% of sales</font></p><p><font face="Arial"><b>2009</b>: \n    Joyou signs landmark distribution agreement for the Asian Product Line of \n    Grohe AG in China</font></p><p><font face="Arial"><b>2009</b>: Grohe AG invest \n    into Joyou</font></p><p><font face="Arial"><b>2009</b>:Joyou engaged Ms. \n    Jingjing Guo, the Olympic gold medalist as the Joyou brand ambassador</font></p><p>\n\n    <font face="Arial"><b>2008</b>: Sales growth of more than 200% with a total \n    year end of 2,608 employees</font></p><p><font face="Arial"><b>2007</b>: \n    Establishment of new factory with new production line for faucets</font></p><p>\n    <font face="Arial"><b>2006</b>: Strategic shift towards the distribution of \n    own brand products on the domestic market and establishing of domestic \n    distribution network</font></p><p><font face="Arial"><b>2003</b>: China Water \n    Conservation certificate</font></p><p><font face="Arial"><b>2003</b>: Business \n    focus on OEM</font></p><p><font face="Arial"><b>1998</b>: Joyou obtained \n    ISO:9002 Quality System Certification</font></p><p><font face="Arial"><b>1995</b>: \n    Registration  of the Joyou brand</font></p><p><font face="Arial"><b>1988</b>: \n    First corporate predecessor founded under the name Fujian Nan''an Fuxin \n    Water-Warmth Appliances &amp; Material Factory<br />\n\n    <br />\n    <b>1979</b>: Mr Jianshe CAI, the founder of Joyou, founded his first family \n    business</font><br />\n    <font face="Arial"> <br />\n    <br />\n　</font></p>', '', '1', '1', '2011-03-25 16:48:16');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;