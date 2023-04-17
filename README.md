*Current status: Login screen completed, just need to link login and register functionality when DB is set up*

To run your project, navigate to the directory.

- cd BarcodeScanner

Then, install dependencies
- npm install 

Lastly, choose which system you'd like to run on. Ours works best on ios.
- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web


New standards for expo -- When you do an npm install in the project, expo will install (I THINK)

npx expo start

Example response for reference:
{
    "product": {
        "artist": null,
        "attributes": {
            "age_group": "adult",
            "color": "no color",
            "gender": "unisex",
            "mpn": "722252660084",
            "size": "All",
            "weight": "1.0097"
        },
        "author": null,
        "barcode_formats": {
            "ean_13": "0722252660084",
            "upc_a": "722252660084"
        },
        "brand": null,
        "category": [
            "Food Items",
            "Snack Foods",
            "Cereal & Granola Bars"
        ],
        "description": "Energy Bars - Crunchy Peanut Butter Peanut Butter Energy Bars - Crunchy Peanut Butter Peanut Butter.",
        "features": [],
        "images": [
            "https://images.barcodelookup.com/324/3243124-1.jpg"
        ],
        "ingredients": "Organic Brown Rice Syrup, Organic Rolled Oats, Organic Cane Syrup, Organic Peanut Butter, Organic Roasted Soybeans, Soy Protein Isolate, Peanuts, Peanut Flour, Rice Flour, Organic Soy Flour, Organic Oat Fiber, Natural Flavors, Sea Salt, Barley Malt Extract. Vitamins &amp; Minerals: Dicalcium Phosphate, Magnesium Oxide, Ascorbic Acid (vit. C), Dl-alpha Tocopheryl Acetate (vit. E), Beta Carotene (vit. A), Niacinamide (vit. B3), Ergocalciferol (vit. D2), Thiamine Mononitrate (vit. B1), Pyridoxine Hydrochloride (vit. B6), Riboflavin (vit. B2), Cyanocobalamin (vit. B12).",
        "manufacturer": "Clif Bar",
        "online_stores": [
            {
                "name": "Blain Farm & Fleet",
                "price": "$5.99",
                "url": "http://www.farmandfleet.com/products/822336-clif-bar-crunchy-peanut-butter-energy-bars-6-count.html?feedsource=2&utm_source=affiliate&utm_medium=feed&utm_campaign=CJ%20Feed"
            },
            {
                "name": "Walgreens",
                "price": "$5.99",
                "url": "https://www.walgreens.com/store/c/clif-bar-energy-bars---crunchy-peanut-butter-peanut-butter/ID=prod6342063-product"  
            },
            {
                "name": "Target",
                "price": "$5.99",
                "url": "https://www.target.com/p/clif-bar-crunchy-peanut-butter-energy-bar-6ct/-/A-13508840"
            },
            {
                "name": "buybuy BABY",
                "price": "$6.99",
                "url": "https://www.bedbathandbeyond.com/store/product/clif-bar-6-pack-crunchy-peanut-butter-2-4-oz-energy-bar/1020158323?skuId=20158323" 
            },
            {
                "name": "Bed Bath & Beyond",
                "price": "$6.99",
                "url": "https://www.bedbathandbeyond.com/store/product/clif-bar-6-pack-crunchy-peanut-butter-2-4-oz-energy-bar/1020158323?skuId=20158323"  
            },
            {
                "name": "Harmon Face Values",
                "price": "$6.49",
                "url": "https://www.harmondiscount.com/722252660084-Clif-Bar-Crunch-Peanut-Butter-6-pack/p/722252660084?utm_source=googleshopping"   
            } 
        ],
        "title": "Clif Bar Energy Bars - Crunchy Peanut Butter Peanut Butter - 2.4 Oz X 6 Pack"
    }
}

