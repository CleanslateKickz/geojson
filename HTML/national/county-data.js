// County data for tax assessor and GIS links
// Keys here should match the 'COUNTY_NAME' property found in the GeoJSON boundaries
const countyUrls = {
  // Oregon Counties
  'BAKER': {
    taxUrl: 'https://www4.bakercountyor.gov/webproperty/Assessor_Search.html',
    gisUrl: 'https://ormap.net/gis/index.html'
  },
  'BENTON': {
    taxUrl: 'https://assessment.bentoncountyor.gov/property-account-search/',
    gisUrl: 'https://bentoncountygis.maps.arcgis.com/apps/webappviewer/index.html?id=57b2358b418142b2891b3e863c29126a'
  },
  'CLACKAMAS': {
    taxUrl: 'http://ascendweb.clackamas.us/',
    gisUrl: 'https://maps.clackamas.us/maps/cmap'
  },
  'CLATSOP': {
    taxUrl: 'https://apps.clatsopcounty.gov/property/',
    gisUrl: 'https://delta.co.clatsop.or.us/apps/ClatsopCounty/'
  },
  'COLUMBIA': {
    taxUrl: 'https://propertyquery.columbiacountyor.gov/columbiaat/MainQueryPage.aspx?QueryMode=&Query=',
    gisUrl: 'https://gis.columbiacountymaps.com/ColumbiaCountyWebMaps/'
  },
  'COOS': {
    taxUrl: 'https://records.co.coos.or.us/pso',
    gisUrl: 'https://www.arcgis.com/home/webmap/viewer.html?webmap=1be7dbc77f8745d78fc5f3e8e85fc05e&extent'
  },
  'CROOK': {
    taxUrl: 'https://apps.lanecounty.org/PropertyAssessmentTaxationSearch/crook/search/general',
    gisUrl: 'https://geo.co.crook.or.us/portal/apps/webappviewer/index.html?id=370f5ec185b945db9d92999cef827982'
  },
  'CURRY': {
    taxUrl: 'https://open.maps.rlid.org/CurryCounty/CurryCountyApp/index.html',
    gisUrl: 'https://open.maps.rlid.org/CurryCounty/CurryCountyApp/index.html'
  },
  'DESCHUTES': {
    taxUrl: 'https://dial.deschutes.org/',
    gisUrl: 'https://dial.deschutes.org/Real/InteractiveMap'
  },
  'DOUGLAS': {
    taxUrl: 'https://orion-pa.co.douglas.or.us/Home',
    gisUrl: 'https://geocortex.co.douglas.or.us/html5viewer/index.html?viewer=douglas_county_gis.viewer'
  },
  'GILLIAM': {
    taxUrl: '', // No URL provided in original
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP
  },
  'GRANT': {
    taxUrl: 'https://www.cci400web.com:8183/GrantCo_PropertyInq/',
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP
  },
  'HARNEY': {
    taxUrl: 'https://records.harneycountyor.gov/pso/',
    gisUrl: 'https://harneycounty.maps.arcgis.com/apps/webappviewer/index.html?id=22b86dac6fa8482ba2ab156c8dfa8889'
  },
  'HOOD RIVER': {
    taxUrl: 'https://records.co.hood-river.or.us/PSO',
    gisUrl: 'https://webmap.hoodrivercounty.gov/'
  },
  'JACKSON': {
    taxUrl: 'https://pdo.jacksoncountyor.gov/pdo/',
    gisUrl: 'https://hub.arcgis.com/maps/58ae5e6d9699445bad7ad78528785690'
  },
  'JEFFERSON': {
    taxUrl: 'https://query.co.jefferson.or.us/PSO',
    gisUrl: 'http://maps.co.jefferson.or.us/'
  },
  'JOSEPHINE': {
    taxUrl: 'https://jcpa.josephinecounty.gov/Home',
    gisUrl: 'https://joco.maps.arcgis.com/apps/webappviewer/index.html?id=6b4f29b1fe824d8d851088a44936739e'
  },
  'KLAMATH': {
    taxUrl: 'https://assessor.klamathcounty.org/PSO/',
    gisUrl: 'https://kcgis.maps.arcgis.com/apps/webappviewer/index.html?id=664411956da94614a80be24849b74c1b&extent=-13553674.8692%2C5191062.857%2C-13550617.3881%2C5192486.4967%2C102100'
  },
  'LAKE': {
    taxUrl: '', // No URL provided in original
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP, original pointed to FL
  },
  'LANE': {
    taxUrl: 'https://apps.lanecounty.org/PropertyAccountInformation/',
    gisUrl: 'https://lcmaps.lanecounty.org/LaneCountyMaps/LaneCountyMapsApp/index.html'
  },
  'LINCOLN': {
    taxUrl: 'https://propertyweb.co.lincoln.or.us/Home',
    gisUrl: 'https://maps.co.lincoln.or.us/#on=blank/blank;sketch/default;basemap_labels/city_labels;basemap_labels/town_labels;basemap_labels/rivers_and_streams_labels;basemap_labels/streets_labels;basemap_labels/HywShlds;Taxlots/Taxlots;Taxlots/TaxLines_NoSubtype;Taxlots/TaxLines_Subtype;Taxlots/TaxWaterLines;Taxlots/TaxLabels150;Taxlots/TaxArrows150;Taxlots_selection/Taxlots_selection;a_basemap/city;a_basemap/rivers_and_streams;a_basemap/water;a_basemap/land;a_basemap/sections;a_basemap/sectionstxt;a_basemap/Contours;a_basemap/Contours_(10ft);surveys_selection/surveys_selection;a_basemap_selection/sectionstxt_selection;Services_and_Districts_selection/Services_and_Districts_selection&loc=-124.99274;44.22348;-122.72907;45.10083'
  },
  'LINN': {
    taxUrl: 'https://lc-helionweb.co.linn.or.us/pso/',
    gisUrl: 'https://gis.co.linn.or.us/portal/apps/webappviewer/index.html?id=afcf95382e0148339c9edb3bed350137'
  },
  'MALHEUR': {
    taxUrl: 'https://www.cci400web.com:8183/MalheurCo_PropertyInq/',
    gisUrl: 'https://geo.maps.arcgis.com/apps/webappviewer/index.html?id=516e7d03477e496ea86de6fde8ff4f2b'
  },
  'MARION': {
    taxUrl: 'https://mcasr.co.marion.or.us/PropertySearch.aspx',
    gisUrl: 'https://marioncounty.maps.arcgis.com/apps/webappviewer/index.html?id=b41e1f1b340a448682a2cc47fff41b31'
  },
  'MORROW': {
    taxUrl: 'https://records.co.morrow.or.us/PSO/',
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP
  },
  'MULTNOMAH': {
    taxUrl: 'https://multcoproptax.com/Property-Search',
    gisUrl: 'https://multco.maps.arcgis.com/apps/webappviewer/index.html?id=9af70037e14d4bd2bfa3ed73f6fcd301'
  },
  'POLK': {
    taxUrl: 'https://apps2.co.polk.or.us/PSO',
    gisUrl: 'https://maps.co.polk.or.us/pcmaps/'
  },
  'SHERMAN': {
    taxUrl: '', // No URL provided in original
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP
  },
  'TILLAMOOK': {
    taxUrl: 'https://query.co.tillamook.or.us/PSO/',
    gisUrl: 'https://experience.arcgis.com/experience/f4434a096c5641b09c8eacb0d9caa8e9'
  },
  'UMATILLA': {
    taxUrl: 'https://umatillacogis.maps.arcgis.com/apps/webappviewer/index.html?id=31d08e9fa56045628407eb957b922892',
    gisUrl: 'https://umatillacogis.maps.arcgis.com/apps/webappviewer/index.html?id=31d08e9fa56045628407eb957b922892'
  },
  'UNION': {
    taxUrl: 'https://lookup.union-county.org/PSO',
    gisUrl: 'https://unioncounty-or.maps.arcgis.com/apps/instant/media/index.html?appid=ce153b227b1646b38403c5963702e4c2'
  },
  'WALLOWA': {
    taxUrl: '', // No URL provided in original
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP
  },
  'WASCO': {
    taxUrl: 'https://public.co.wasco.or.us/webtax/(S(y5f5x0cq0ht1hgap43wgofdg))/default.aspx',
    gisUrl: 'https://public.co.wasco.or.us/gisportal/apps/webappviewer/index.html?id=80a942ec81da4dd2bcc16032cc329459'
  },
  'WASHINGTON': {
    taxUrl: 'https://washcotax.co.washington.or.us/',
    gisUrl: 'https://wcgis1.co.washington.or.us/Html5Viewer/index.html?viewer=Intermap'
  },
  'WHEELER': {
    taxUrl: '', // No URL provided in original
    gisUrl: 'https://ormap.net/gis/index.html' // Generic ORMAP
  },
  'YAMHILL': {
    taxUrl: 'https://ascendweb.co.yamhill.or.us/AcsendWeb/(S(04dpphdmjiwfm0iwgouyh5yd))/default.aspx',
    gisUrl: 'https://www.yamhillcountymaps.com/'
  },

  // California Counties
  'ALAMEDA': { taxUrl: '', gisUrl: 'https://www.acassessor.org/parcel_viewer/' },
  'ALPINE': { taxUrl: '', gisUrl: 'https://www.alpinecountyca.gov/646/Parcel-Map' },
  'AMADOR': { taxUrl: 'https://gisviewer.amadorgov.org/GPV/ParcelSearch.aspx', gisUrl: 'https://gisviewer.amadorgov.org/gpv/Viewer.aspx' },
  'BUTTE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/5e8ca3d811bc454192fd2a7e1f938103' },
  'CALAVERAS': { taxUrl: '', gisUrl: 'https://gisportal.calaverascounty.gov/portal/apps/webappviewer/index.html?id=fa903a4622014f1eb0a6ea5f4d11f121' },
  'COLUSA': { taxUrl: '', gisUrl: 'https://colusacountydpw.maps.arcgis.com/apps/webappviewer/index.html?id=ba6fd932ef964ce7b9f17e6fdfd2f6f2' },
  'CONTRA COSTA': { taxUrl: 'https://assr.parcelquest.com/Home/Disclaimer', gisUrl: 'https://www.arcgis.com/apps/webappviewer/index.html?id=92d542bcb39247e8b558021bd0446d18' },
  'DEL NORTE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/aae802f34f9f43eaad52f334145bc798/' },
  'EL DORADO': { taxUrl: 'https://parcel.edcgov.us/', gisUrl: 'https://see-eldorado.edcgov.us/ugotnet/' },
  'FRESNO': { taxUrl: 'https://fcacttcptr.fresnocountyca.gov/', gisUrl: 'https://gisportal.co.fresno.ca.us/portal/home/webmap/viewer.html?useExisting=1' },
  'GLENN': { taxUrl: 'https://assr.parcelquest.com/Home/Disclaimer', gisUrl: 'https://countyofglenn.maps.arcgis.com/home/index.html' },
  'HUMBOLDT': { taxUrl: '', gisUrl: 'https://cty-gis-web.co.humboldt.ca.us/HCEGIS3.0/' },
  'IMPERIAL': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'INYO': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'KERN': { taxUrl: '', gisUrl: 'https://maps.kerncounty.com/H5/index.html?viewer=KCPublic' },
  'KINGS': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'LAKE': { taxUrl: '', gisUrl: 'https://gispublic.co.lake.ca.us/portal/apps/webappviewer/index.html?id=87dfc0c535b2478bb67df69d6d319eca' },
  'LASSEN': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'LOS ANGELES': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'MADERA': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'MARIN': { taxUrl: '', gisUrl: 'https://www.marinmap.org/Html5Viewer/Index.html?viewer=smmdataviewer' },
  'MARIPOSA': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'MENDOCINO': { taxUrl: '', gisUrl: 'https://gis.mendocinocounty.org/portal/apps/webappviewer/index.html?id=255d7af6ece142b9962e92181d0f4ad9' },
  'MERCED': { taxUrl: '', gisUrl: 'https://gis.countyofmerced.com/portal/apps/experiencebuilder/experience/?id=79ed13d9dac343a8a9d9ff516dc977c3' },
  'MODOC': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'MONO': { taxUrl: '', gisUrl: 'https://gis.mono.ca.gov/apps/pv/' },
  'MONTEREY': { taxUrl: '', gisUrl: 'https://maps.co.monterey.ca.us/wab/parcelreportwebapp/' },
  'NAPA': { taxUrl: 'https://common1.mptsweb.com/mbap/napa/asr', gisUrl: 'https://gis.countyofnapa.org/portal/apps/webappviewer/index.html?id=0bbafe490c58430da719ff851c78b7fa' },
  'NEVADA': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/45d30af79b1e45f792844b897a45131a' },
  'ORANGE': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'PLACER': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/a29d510f9e9d4a98ac2158fca49aecbc' },
  'PLUMAS': { taxUrl: '', gisUrl: 'https://mangomap.com/plumasgis/maps/47398/parcel-query' },
  'RIVERSIDE': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'SACRAMENTO': { taxUrl: '', gisUrl: 'https://assessorparcelviewer.saccounty.gov/jsviewer/assessor.html' },
  'SAN BENITO': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/eccc7174b6904afe857b91253314c5f0/' },
  'SAN BERNARDINO': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'SAN DIEGO': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'SAN FRANCISCO': { taxUrl: '', gisUrl: 'https://sfplanninggis.org/PIM/' },
  'SAN JOAQUIN': { taxUrl: '', gisUrl: 'https://sjmap.org/DistrictViewer/' },
  'SAN LUIS OBISPO': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'SAN MATEO': { taxUrl: '', gisUrl: 'https://gis.smcgov.org/Html5Viewer/?viewer=raster' },
  'SANTA BARBARA': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'SANTA CLARA': { taxUrl: '', gisUrl: 'https://geoess.sccgov.org/discovergis/sccmap' },
  'SANTA CRUZ': { taxUrl: '', gisUrl: 'https://sccgis.santacruzcountyca.gov/gisweb/' },
  'SHASTA': { taxUrl: '', gisUrl: 'https://gis.shastacounty.gov/portal/apps/webappviewer/index.html?id=4f98f0b9cadb415d8a3f2b8c5c1b2e8e' },
  'SIERRA': { taxUrl: '', gisUrl: 'https://mydashgis.com/SierraCountyPublic/auth/login' },
  'SISKIYOU': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/c9a297953b9745198a47ac596aacece6' },
  'SOLANO': { taxUrl: '', gisUrl: 'https://solanocountygis.com/portal/apps/webappviewer/index.html?id=b2a40316824143fc9f361d5d81c51a7a' },
  'SONOMA': { taxUrl: 'https://common1.mptsweb.com/mbap/SONOMA/asr', gisUrl: 'https://gis-property.sonomacounty.ca.gov/pages/my-property' },
  'STANISLAUS': { taxUrl: '', gisUrl: 'https://stancounty-gis.maps.arcgis.com/apps/webappviewer/index.html?id=cde022e7ffe845f690a6a8e19322ceac' },
  'SUTTER': { taxUrl: 'https://ca-sutter.publicaccessnow.com/Assessor/PropertySearch.aspx', gisUrl: 'https://www.arcgis.com/apps/webappviewer/index.html?id=6556d0deabef46f2afe00818c336e9bc' },
  'TEHAMA': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'TRINITY': { taxUrl: '', gisUrl: 'https://trinitycounty.maps.arcgis.com/apps/Viewer/index.html?appid=320cf1c1558c43c8b1f2f70c23d35026' },
  'TULARE': { taxUrl: 'https://common1.mptsweb.com/mbap/tulare/asr', gisUrl: 'https://iportal.tularecounty.ca.gov/iportal/apps/webappviewer/index.html?id=a1a6e2f2f9f341ed84a64f3b61919760' },
  'TUOLUMNE': { taxUrl: '', gisUrl: 'https://arcg.is/1OPCWu' },
  'VENTURA': { taxUrl: '', gisUrl: '' }, // No URL provided in original
  'YOLO': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/1c0ae779a0f7456185f1910ef588d8fb' },
  'YUBA': { taxUrl: 'https://common1.mptsweb.com/mbap/yuba/asr', gisUrl: 'https://yubacounty.maps.arcgis.com/apps/View/index.html?appid=3f1f521b03994e3390a43e' },

  // Idaho Counties (GeoJSON NAME property will be used as the key)
  'ADA': { taxUrl: '', gisUrl: 'https://gisprod.adacounty.id.gov/arcgis/apps/sites/#/gis/apps/dce37c96cc634e4085751b812b62f864/explore' },
  'ADAMS': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/adams.html#on=sketch/default;parcels1/parcels1;scalebar_feet/scalebar_feet;Centroids/Centroids;parcels/parcels;adams/adams;boundry/boundry;roads1/roads1;mask2/mask2;YYE1/YYE1;YYE2/YYE2;rdline/rdline;rdline2/rdline2&loc=152.8740565703525;-12965936;5598859' },
  'BANNOCK': { taxUrl: '', gisUrl: 'https://bannock.maps.arcgis.com/apps/webappviewer/index.html?id=dfe86cb077844d8f8b68ba01ac6f7087' },
  'BEAR LAKE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/80eab38489484e0f96eca9880942a2d4/' },
  'BENEWAH': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/benewah.html#on=sketch/default;scalebar_feet/scalebar_feet;parcels/parcels;parcelstca/parcelstca;boundry/boundry;BenewahMask/BenewahMask;openstreetmap/osm_mapnik&loc=76.43702828517625;-12982179.2;5986853' },
  'BINGHAM': { taxUrl: '', gisUrl: 'https://bingham-id.maps.arcgis.com/apps/webappviewer/index.html?id=1054e27ca3c74f5ca9ce9439a832c933' },
  'BLAINE': { taxUrl: '', gisUrl: 'https://maps.co.blaine.id.us/custapps/parcelinfomap/' },
  'BOISE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/444b5973179d4d7d8b11aa41b7675018/' },
  'BONNER': { taxUrl: '', gisUrl: 'https://cloudgisapps.bonnercountyid.gov/public/' },
  'BONNEVILLE': { taxUrl: '', gisUrl: 'https://bonneville.maps.arcgis.com/apps/webappviewer/index.html?id=f5f27c3e084449c3b933b019a9b7444b' },
  'BOUNDARY': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/boundary.html#on=sketch/default;BoundaryMask/BoundaryMask;parcelstca/parcelstca;parcels/parcels;boundry/boundry;openstreetmap/osm_mapnik&loc=1290.7694804153787;-12956960.636784526;6264736.526003166' },
  'BUTTE': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/butte.html#on=sketch/default;parcels/parcels;ButteMask1/ButteMask1;boundry/boundry;openstreetmap/osm_mapnik&loc=305.748113140705;-12612460;5409129' },
  'CAMAS': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/68bb058a53804b4e8fe77b307f7d6c60/' },
  'CANYON': { taxUrl: '', gisUrl: 'https://maps.canyonco.org/arcgisportal/apps/webappviewer/index.html?id=d8d464f3b19f485bb9d4d9136aba0ee5' },
  'CARIBOU': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/caribou.html#on=sketch/default;scalebar_feet/scalebar_feet;parcels/parcels;CaribouMask/CaribouMask;boundry/boundry;openstreetmap/osm_mapnik&loc=152.8740565703525;-12423892;5259617' },
  'CASSIA': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/cassia.html#on=sketch/default;scalebar_feet/scalebar_feet;parcels/parcels;CassiaMask/CassiaMask;openstreetmap/osm_mapnik&loc=152.8740565703525;-12641308;5208495' },
  'CLARK': { taxUrl: '', gisUrl: 'https://maps.greenwoodmap.com/clarkid/map#zcr=10.528616943231334/-12502500/5508000/0&lyrs=topoesri,statefed,ownership' },
  'CLEARWATER': { taxUrl: '', gisUrl: 'https://clearwatercounty.maps.arcgis.com/apps/webappviewer/index.html?id=196e58c22bcb49dfa4dfcf7f8475f9b3' },
  'CUSTER': { taxUrl: '', gisUrl: 'https://www.greenwoodmap.com/custer/map?' },
  'ELMORE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/6ee0ae6fb7184ceea3c640f0345f0392/' },
  'FRANKLIN': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/d77ace3c532f441a91e36ff821805867/' },
  'FREMONT': { taxUrl: '', gisUrl: 'https://maps.greenwoodmap.com/fremontid/map#zcr=9.954603065992348/-12423601/5514046/0&lyrs=cities,ownadj,roads' },
  'GEM': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/e7af2f0fdf0e4b41bc872c17da9c94b8/' },
  'GOODING': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/gooding.html#on=sketch/default;measure/default;scalebar_feet/scalebar_feet;parcels_tca/parcels_tca;parcelslegal/parcelslegal;GoodingMask/GoodingMask;parcels/parcels;parcelsgooding1/parcelsgooding1;boundry/boundry;roads/roads;openstreetmap/osm_mapnik&loc=152.8740565703525;-12769722.8;5302666' },
  'IDAHO': { taxUrl: '', gisUrl: 'https://idahocounty.maps.arcgis.com/apps/webappviewer/index.html?id=516b62a73fcc409fa6ef95e3b8304d8b' },
  'JEFFERSON': { taxUrl: '', gisUrl: 'https://jeffgis.maps.arcgis.com/apps/webappviewer/index.html?id=e1de1c6048044da2b4e89ec5b841f0db' },
  'JEROME': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/a51bd85f06a74725acf0b438d74b163d/' },
  'KOOTENAI': { taxUrl: '', gisUrl: 'https://gis.kcgov.us/app/kcearth/' },
  'LATAH': { taxUrl: '', gisUrl: 'https://gis.latah.id.us/ParcelViewer/ParcelViewer.html' },
  'LEMHI': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/f5d22beb6e904b75823847ff4b545c02/' },
  'LEWIS': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/634750311de54cca9015909a11ae0d75/' },
  'LINCOLN': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/c3c6f7daf88b48eea1633af924f11e5c' },
  'MADISON': { taxUrl: '', gisUrl: 'https://apps.vertigisstudio.com/web/?app=fc5a0cc65c7d4c429b8709cf2c3bcdae' },
  'MINIDOKA': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/cb4ec83c40fd41bea57344fd1ded4f1e/' },
  'NEZ PERCE': { taxUrl: '', gisUrl: 'https://gis.co.nezperce.id.us/npcmap/' },
  'ONEIDA': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/de7393cd2b5349d89ac39c2f4f025afc/' },
  'OWYHEE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/e7e99e11f3b540c288b2d3de56c60799/' },
  'PAYETTE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/7d1e34f961e441cf8b5db2858aa04134/' },
  'POWER': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/6336ed5b726a43cb92f45a524324443e/' },
  'SHOSHONE': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/c2e6b36de1274674b9189843d0c37f6f/' },
  'TETON': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/ff8271e334454c8da27f56b29ae9cb95' },
  'TWIN FALLS': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/500194bd1dd64c259bd481a42ac62f5a/' },
  'VALLEY': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/948002caf8c64d76918b146cbcb730e2/' },
  'WASHINGTON': { taxUrl: '', gisUrl: 'https://maps.idahoparcels.us/geomoose/desktop/washington.html#on=sketch/default;WRoads/WRoads;scalebar_feet/scalebar_feet;WashingtonMask/WashingtonMask;parcels/parcels;ParcelLines/ParcelLines;bing/roads&loc=152.8740565703525;-13004537.4;5531098' },

  // Washington Counties (GeoJSON COUNTY_NAME property will be used as the key)
  'CLARK': { taxUrl: 'https://gis.clark.wa.gov/gishome/property/index.cfm?', gisUrl: 'https://gis.clark.wa.gov/mapsonline/index.cfm?' },
  'GRANT': { taxUrl: 'https://propertysearch.grantcountywa.gov/PropertyAccess/PropertySearch.aspx?cid=10', gisUrl: 'https://grantcountywa.maps.arcgis.com/apps/webappviewer/index.html?id=f493cf3b971746609b4588893299dd55' },
  'PACIFIC': { taxUrl: 'https://pacificwa-taxsifter.publicaccessnow.com/Search/Results.aspx', gisUrl: 'https://pacificwa-mapsifter.publicaccessnow.com/defaultHTML5.aspx' },
  'ISLAND': { taxUrl: '', gisUrl: 'https://icgeomap.islandcountywa.gov/Html5Viewer/Index.html?viewer=ICGeoMap#' },
  'JEFFERSON': { taxUrl: '', gisUrl: 'https://gisweb.jeffcowa.us/LandRecords/' },
  'FRANKLIN': { taxUrl: '', gisUrl: 'https://gisportal.franklin.co.franklin.wa.us/arcgisportal/apps/instant/sidebar/index.html?appid=5e2bcce6a95147628503a487ff88a5c8' },
  'GARFIELD': { taxUrl: 'https://www.nemrc.info/web_data/wagarf/searchT.php', gisUrl: 'https://gmci.maps.arcgis.com/apps/webappviewer/index.html?id=5ad702c3f8674b49bc4f4539ee2ed7be' },
  'LEWIS': { taxUrl: 'https://parcels.lewiscountywa.gov/', gisUrl: 'https://gis.lewiscountywa.gov/webmap/' },
  'KING': { taxUrl: 'https://blue.kingcounty.com/Assessor/eRealProperty/default.aspx', gisUrl: 'https://gismaps.kingcounty.gov/parcelviewer2/' },
  'WAHKIAKUM': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/ca8c601a255948999d55f82547350648/' },
  'SKAMANIA': { taxUrl: '', gisUrl: 'https://skamaniawa-mapsifter.publicaccessnow.com/defaultHTML5.aspx' },
  'WALLA WALLA': { taxUrl: '', gisUrl: 'https://wallawallacountygis-wwcgis.hub.arcgis.com/apps/b01c5bcbbfa848d385afc5df6b91815a/explore' },
  'STEVENS': { taxUrl: '', gisUrl: 'https://gis.stevenscountywa.gov/portal/apps/webappviewer/index.html?id=05b3db70cbca42e9b6027c0a9267ddeb' },
  'CLALLAM': { taxUrl: 'https://websrv22.clallam.net/propertyaccess/?cid=0', gisUrl: 'https://clallam-county-portal-clallam.hub.arcgis.com/apps/23bbb33c10b24b4c8706e89ae98f7add/explore' },
  'SNOHOMISH': { taxUrl: 'https://www.snoco.org/proptax/(S(eg5a0jvrz54r3o42xs3y3g4e))/default.aspx', gisUrl: 'https://scopi.snoco.org/Html5Viewer/Index.html?configBase=https://scopi.snoco.org/Geocortex/Essentials/REST/sites/SCOPI/viewers/SCOPI/virtualdirectory/Resources/Config/Default' },
  'LINCOLN': { taxUrl: 'https://lincolnwa-taxsifter.publicaccessnow.com/Disclaimer.aspx', gisUrl: 'https://lincolnwa-mapsifter.publicaccessnow.com/defaultHTML5.aspx' },
  'THURSTON': { taxUrl: 'https://tcproperty.co.thurston.wa.us/propsql/front.asp', gisUrl: 'https://map.co.thurston.wa.us/vertigisstudio/web/?app=a40ca3383ca6444d8193e3f713be224e' },
  'PIERCE': { taxUrl: 'https://pals.piercecountywa.gov/palsonline/#/AboutMyProperty', gisUrl: 'https://matterhornwab.co.pierce.wa.us/publicgis/' },
  'WHATCOM': { taxUrl: 'https://property.whatcomcounty.us/propertyaccess/?cid=0', gisUrl: 'https://whatcom.maps.arcgis.com/apps/webappviewer/index.html?id=f2f8eaa500b04f54948c680bb280129f' },
  'KITSAP': { taxUrl: 'https://psearch.kitsap.gov/pdetails', gisUrl: 'https://psearch.kitsap.gov/psearch/' },
  'WHITMAN': { taxUrl: 'https://terrascan.whitmancounty.net/Taxsifter/Search/Results.aspx', gisUrl: 'https://www.arcgis.com/apps/mapviewer/index.html?webmap=f1211029d81c42e6a87fc9a7073e0c5a' },
  'COWLITZ': { taxUrl: '', gisUrl: 'https://cowlitzgis.net/ccportal/apps/webappviewer/index.html?id=9dde437829474cba8cf2a46741979a6b' },
  'FERRY': { taxUrl: 'https://ferrywa-taxsifter.publicaccessnow.com/Search/Results.aspx', gisUrl: 'https://ferrywa-mapsifter.publicaccessnow.com/defaultHTML5.aspx' },
  'CHELAN': { taxUrl: 'https://pacs.co.chelan.wa.us/PropertyAccess/?cid=91', gisUrl: 'https://maps.co.chelan.wa.us/GIS/' },
  'OKANOGAN': { taxUrl: 'https://okanoganwa-taxsifter.publicaccessnow.com/Search/Results.aspx', gisUrl: 'https://okanoganwa-mapsifter.publicaccessnow.com/defaultHTML5.aspx' },
  'ASOTIN': { taxUrl: 'https://propertysearch.trueautomation.com/PropertyAccess/?cid=10', gisUrl: 'https://acpw.maps.arcgis.com/apps/webappviewer/index.html?id=42f77d7373844f7ca898e654b0a505a2&find=' },
  'SKAGIT': { taxUrl: '', gisUrl: 'https://www.skagitcounty.net/Maps/iMap/' },
  'GRAYS HARBOR': { taxUrl: '', gisUrl: 'https://graysharborwa.mapgeo.io/datasets/properties?abuttersDistance=100&latlng=47.162736%2C-123.755909' },
  'PEND OREILLE': { taxUrl: 'http://taweb.pendoreille.org/PropertyAccess/PropertySearch.aspx?cid=0', gisUrl: 'https://pendoreilleco.maps.arcgis.com/apps/webappviewer/index.html?id=3da51727ed494b5080a10f928f2d3674' },
  'SPOKANE': { taxUrl: 'https://cp.spokanecounty.org/scout/scoutdashboard/', gisUrl: 'https://cp.spokanecounty.org/scout/map/' },
  'KITTITAS': { taxUrl: 'https://taxsifter.co.kittitas.wa.us/Search/Results.aspx', gisUrl: 'https://kitcogis.maps.arcgis.com/apps/webappviewer/index.html?id=8bcc146d9c2847acb2e9aa239187c25e' },
  'DOUGLAS': { taxUrl: 'https://douglaswa-taxsifter.publicaccessnow.com/Search/Results.aspx', gisUrl: 'https://experience.arcgis.com/experience/fcbc86024e52488980720a525435fb3d' },
  'KLICKITAT': { taxUrl: 'http://www.klickitatcountytreasurer.org/propertysearch.aspx', gisUrl: 'https://imap.klickitatcounty.org/#10/45.8269/-120.7404/c22ecdf827df6af49a' },
  'BENTON': { taxUrl: '', gisUrl: 'https://experience.arcgis.com/experience/8582b0de92054829a5f319354add0655/' },
  'COLUMBIA': { taxUrl: 'http://64.184.153.98/PropertyAccess/PropertySearch.aspx?cid=0', gisUrl: 'https://ccpwdgis.maps.arcgis.com/apps/View/index.html?appid=11a24de2972f4146baced38dbde88773' },
  'SAN JUAN': { taxUrl: 'https://parcel.sanjuancountywa.gov/PropertyAccess/PropertySearch.aspx?cid=0', gisUrl: 'https://gis.sanjuancountywa.gov/polaris/' },
  'YAKIMA': { taxUrl: '', gisUrl: 'https://property.spatialest.com/wa/yakima#/' },
  'MASON': { taxUrl: 'https://property.masoncountywa.gov/TaxSifter/Search/Results.aspx', gisUrl: 'https://gis.masoncountywa.gov/mason/?_gl=1*1d6sn2q*_ga*MTQ3OTg2OTIxLjE3NDU0Njg0MjE.*_ga_81P1QX4XM5*MTc0NTQ2ODQyMS4xLjEuMTc0NTQ2ODQ2Mi4wLjAuMA..' },
  'ADAMS': { taxUrl: 'https://adamswa-taxsifter.publicaccessnow.com/Search/Results.aspx', gisUrl: 'https://adamswa-mapsifter.publicaccessnow.com/defaultHTML5.aspx' }
};