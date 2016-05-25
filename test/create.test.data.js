//Create test categories
var mongoose = require('mongoose'),
    async = require('async'),
    Category = require('.././server/category/category.model'),
    CategoryApi = require('.././server/category/category.api'),

    Price = require('.././server/product/price.model'),

    Perennial = require('.././server/perennial/perennial.model'),
    PerennialApi = require('.././server/perennial/perennial.api'),
    dbname = "staudestedet";


var categoryData = {
    categories : [
        {
            categoryId: "1",
            parentCategory: "0",
            name: "A",
            description: "Stauder, hvor det botaniske navn begynder med A.",
            image: "kategori_a.jpg",
            sortOrder: 1
        },
        {
            categoryId: "4",
            parentCategory: "0",
            name: "B",
            description: "Stauder hvor det botaniske navn starter med B.",
            image: "kategori_b.jpg",
            sortOrder: 2
        },
        {
            categoryId: "5",
            parentCategory: "0",
            name: "Nyheder 2016",
            description: "Nye stauder sæson 2016, sendes fra 1. april",
            image: "kategori_nyheder2016.jpg",
            sortOrder: 3
        },
        {
            categoryId: "2",
            parentCategory: "1",
            name: "Achillea",
            description: "Achillea'erne/røllikerne herunder er alle af en type, der ynder veldrænet vokseplads til den tørre side. Achillea/røllike findes i et utal af farver og er rigtig gode til afskæring. Achillea'erne/røllikerne kan med fordel skæres tilbage efter blomstring for at blomstre igen. og bør deles hvert andet/tredje år for at trives. Nogle achilleaer/rølliker kan være kortlivede.",
            image: "kategori_achillea.jpg",
            sortOrder: 1
        },
        {
            categoryId: "3",
            parentCategory: "1",
            name: "Actaea",
            description: "Actaea/sølvlys er en forholdsvis sent blomstrende staude med en helt fantastisk duft. Actaea/sølvlys trives rigtig godt i Sol / halvskygge / vandrende skygge i en god og ikke for tør havejord. For at holde på fugten kan der med fordel fordeles noget kompost rundt om planten.",
            image: "kategori_actaea.jpg",
            sortOrder: 2
        }
    ]
};

var productData = {
    Products: [
        {
            productId: 1,
            name: "Røllike",
            shortDescription: "God og robust staude til staudebedet og supergod blandt græsser.",
            longDescription: "Gul. 70-80 cm. Juni - august. Sol. Alm. veldrænet havejord. Tørketålende. God og robust staude til staudebedet og supergod blandt græsser. Rølliken er også supergod snitblomst.",
            categories: ["Achillea"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "achillea-coronation-gold.jpg",
            state: "Aktiv",
            genus: "Achillea",
            cultivar: "Coronation Gold",
            heightMin: 70,
            heightMax: 80,
            color: "Gul",
            flowerStart: "Juni",
            flowerEnd: "August",
            soil: "Alm. veldrænet havejord",
            location: "Sol",
            specialProperty: "Tørketålende"
        },
        {
            productId: 2,
            name: "Røllike",
            shortDescription: "Flot Achillea i den fineste lysegule farve",
            longDescription: "Lysegul. 80 cm. Juni - August. Sol. Alm. veldrænet havejord.",
            categories: ["Achillea"],
            productFlags: ["Nyhed"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "achillea-sunny-seduction.jpg",
            state: "Aktiv",
            genus: "Achillea",
            epithet: "Millefolium",
            cultivar: "Sunny Seduction",
            heightMin: 80,
            heightMax: 80,
            color: "Lysegul",
            flowerStart: "Juni",
            flowerEnd: "August",
            soil: "Alm. veldrænet havejord",
            location: "Sol"
        },
        {
            productId: 3,
            name: "Nyserøllike",
            shortDescription: "Flot nyserøllike med dobbelte hvide blomster",
            longDescription: "Hvid m. dobbelt blomst. 50-60 cm. Juni - august. Sol. Alm. havejord. Hvid nyserøllike med dobbelte blomster, der producerer et væld af blomster. En stauder der også er rigtig god til buketter.",
            categories: ["Achillea"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "achillea-ptarmica-the-pearl.jpg",
            state: "Aktiv",
            genus: "Achillea",
            epithet: "Ptarmica",
            cultivar: "The pearl",
            heightMin: 50,
            heightMax: 60,
            color: "Hvid",
            flowerStart: "Juni",
            flowerEnd: "August",
            soil: "Alm. havejord",
            location: "Sol",
            specialProperty: "Dobbelte blomster"
        },
        {
            productId: 4,
            name: "Røllike",
            shortDescription: "Flot rød Røllike",
            longDescription: "Rød. 50-60 cm. Juni - august. Sol. Alm. veldrænet havejord. God og robust staude til staudebedet og supergod blandt græsser. Rølliken er også supergod snitblomst.",
            categories: ["Achillea"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "achillea-safran.jpg",
            state: "Aktiv",
            genus: "Achillea",
            cultivar: "Safran",
            heightMin: 50,
            heightMax: 60,
            color: "Rød",
            flowerStart: "Juni",
            flowerEnd: "August",
            soil: "Alm veldrænet havejord",
            location: "Sol"
        },
        {
            productId: 5,
            name: "Sølvlys",
            shortDescription: "Flot sølvlys med hvide blomster og mørkt løv",
            longDescription: "Hvid med mørkebrunt løv. 70-80 cm. August - september. Sol - halvskygge. Alm. fugtighedsbevarende havejord. Alle sølvlysene har en helt fantastisk duft, når de blomstrer. En staude der også er rigtig god og dekorativ i krukker.",
            categories: ["Actaea"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "actaea-black-negligee.jpg",
            genus: "Actaea",
            epithet: "racemosa",
            cultivar: "Black Negligee",
            heightMin: 70,
            heightMax: 80,
            color: "Hvid",
            flowerStart: "August",
            flowerEnd: "September",
            soil: "Alm. fugtighedsbevarende havejord",
            location: "Sol - halvskygge",
            specialProperty: "Mørkt løv",
            state: "Aktiv"
        },
        {
            productId: 6,
            name: "Sølvlys",
            shortDescription: "Flot sølvlys med sart rosa blomster og mørkt løv",
            longDescription: "Sart rosa med mørkebrunt løv. 70-80 cm. August - september. Sol - halvskygge. Alm. fugtighedsbevarende havejord. Alle sølvlysene har en helt fantastisk duft, når de blomstrer. En staude der også er rigtig god og dekorativ i krukker.",
            categories: ["Actaea"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "actaea-chocoholic.jpg",
            state: "Aktiv",
            genus: "Actaea",
            epithet: "racemosa",
            cultivar: "Chocoholic",
            heightMin: 70,
            heightMax: 80,
            color: "Sart rosa",
            flowerStart: "August",
            flowerEnd: "September",
            soil: "Alm. fugtighedsbevarende havejord",
            location: "Sol - halvskygge",
            specialProperty: "Mørkt løv"
        },
        {
            productId: 7,
            name: "Sølvlys",
            shortDescription: "Traditionel sølvlys med hvide blomster",
            longDescription: "Hvid med grønt løv. 70-80 cm. August - september. Sol - halvskygge. Alm. fugtighedsbevarende havejord. Alle sølvlysene har en helt fantastisk duft, når de blomstrer. En staude der også er rigtig god og dekorativ i krukker.",
            categories: ["Actaea"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "actaea-white-pearl.jpg",
            state: "Aktiv",
            genus: "Actaea",
            epithet: "simplex",
            cultivar: "White Pearl",
            heightMin: 70,
            heightMax: 80,
            color: "Hvid",
            flowerStart: "August",
            flowerEnd: "September",
            soil: "Alm. fugtighedsbevarende havejord",
            location: "Sol - halvskygge"
        },
        {
            productId: 8,
            name: "Ballota",
            shortDescription: "Attraktiv med låddent gråt løv og lilla blomster",
            longDescription: "Lilla med gråt låddent løv. 50 cm. Juli - august. Sol. Tør, varm og veldrænet havejord. Jeg er faldet for det grålige løv på denne plante, men den kræver en meget varm og veldrænet vokseplads for at kunne trives her.",
            categories: ["B"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            productFlags: ["Nyhed"],
            image: "ballota-pseudodictamnus.jpg",
            state: "Aktiv",
            genus: "Ballota",
            epithet: "pdeudodictamnus",
            heightMin: 50,
            heightMax: 50,
            color: "Lilla",
            flowerStart: "Juli",
            flowerEnd: "August",
            soil: "Tør, varm og veldrænet havejord",
            location: "Sol"
        },
        {
            productId: 9,
            name: "Farvebælg",
            shortDescription: "Farvebælg i den flotteste mørke purpur/brune farve",
            longDescription: "Mørk purpur/brun. 70-80 cm. Juni - august. Sol. Alm. havejord.",
            categories: ["B"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            productFlags: ["Nyhed"],
            image: "baptisia-decadence-dutch-chocolate.jpg",
            state: "Aktiv",
            genus: "Baptisia",
            cultivar: "Decadence Dutch Chocolate",
            heightMin: 70,
            heightMax: 80,
            color: "Purpur",
            flowerStart: "Juni",
            flowerEnd: "August",
            soil: "Alm. havejord",
            location: "Sol"
        },
        {
            productId: 10,
            name: "Bergenia",
            shortDescription: "Traditionel kæmpestenbræk med pink blomster",
            longDescription: "Pink. 30 - 40 cm. April - maj. Sol - halvskygge. Alm. havejord.",
            categories: ["B"],
            prices: [new Price({
                price: 25,
                currency: "kr.",
                type: "Normalpris"
            })],
            image: "bergenia-abendglut.jpg",
            state: "Aktiv",
            genus: "Bergenia",
            cultivar: "Abendglut",
            heightMin: 30,
            heightMax: 40,
            color: "Pink",
            flowerStart: "April",
            flowerEnd: "Maj",
            soil: "Alm. havejord",
            location: "Sol - halvskygge"
        }
    ]
};

var productFlagData = {
    productFlags : [
        {
            productFlagId: 1,
            name: "Nyhed",
            image: "news_flag.jpg"
        },
        {
            productFlagId: 2,
            name: "Godt køb",
            image: "sale_flag.jpg"
        }
    ]
};

var username		= 'staudestedetAdmin',
    password		= 'staudestedet2016',
    dbServer		= 'ds011482.mlab.com:11482',
    dbName 			= 'staudestedet';

//Setup db connection
mongoose.connect('mongodb://' + username + ':' + password + '@' + dbServer + '/' + dbName);

//Delete existing categories and create new
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", createData);

function createData() {
    Category.remove({}, function (err) {
        if (err) console.log(err);
        insertCategories(function (err) {
            if (err) console.log(err);
            Perennial.remove({}, function (err) {
                if (err) console.log(err);
                insertProducts(function (err) {
                    if (err) console.log(err);
                });
            });
        });
    });
}

function insertCategories(handleInsertCategories){
    console.info('Adding categories to staudestedet db');
    async.forEachSeries(categoryData.categories, function(category, handleInsertCategories){
            CategoryApi.create(category, function(err){
                if(err) return handleInsertCategories(err);
                handleInsertCategories();
            });
        }, function(err){
            if(err) return handleInsertCategories(err);
            handleInsertCategories();
        }
    );
    console.info('Done adding categories to staudestedet db');
}

function insertProducts(handleInsertProduct){
    console.info('Adding product to staudestedet db');
    async.forEachSeries(productData.Products, function(product, handleInsertProduct){
            PerennialApi.create(product, function(err){
                if(err) return handleInsertProduct(err);
                handleInsertProduct();
            });
        }, function(err){
            if(err) return handleInsertProduct(err);
        handleInsertProduct();
        }
    );
    console.info('Done adding products to staudestedet db');
}
