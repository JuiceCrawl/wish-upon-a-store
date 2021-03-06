app.factory('ProductFactory', function($http) {
    var cachedCollections = [];
    var cachedProducts = [];
    return {
        getOneProduct: function(id) {
            return $http.get('/api/products/' + id)
                .then(function(product) {
                    return product.data
                })
        },
        getAllProducts: function() {
            return $http.get('/api/products')
                .then(function(products) {
                    angular.copy(products.data, cachedProducts)
                    return products.data
                })
        },
        getOneCollection: function(id) {
            return $http.get('/api/collections/' + id)
                .then(function(collection) {
                    return collection.data
                })
        },
        getAllCollections: function() {
            return $http.get('/api/collections')
                .then(function(collections) {
                    angular.copy(collections.data, cachedCollections)
                    return cachedCollections
                })
        },
        getProductsByCollectionId: function(id) {
            return $http.get('/api/collections/' + id + '/products')
                .then(function(products) {
                    return products.data
                })
        },

        // ADMIN METHODS START HERE:
        
        //here data will likely just be an object that looks like {name: 'Career'}
        createCollection: function(data) {
            return $http.post('/api/collections', data)
                .then(function(collection) {
                	cachedCollections.push(collection.data)
                    return collection.data
                })
        },
        editCollection: function(id, data) {
            return $http.put('/api/collections/' + id, data)
                .then(function(collection) {
                    return collection.data
                })
        },
        addProductToCollection: function(id, data) {
            return $http.post('/api/collections/' + id + '/products', data)
                .then(function(collection) {
                    return collection.data
                })
        },
        
        //this would be nice to have at some point :)
        // deleteProductFromCollection: function(catId, productId){
        //return $http.delete('/api/collections/'+catId+'/products/'+productId)
        // .then(function(collection){
        // 	return collection.data
        // })
        // },
        deleteCollection: function(collection) {
            console.log(collection);
        	cachedCollections.splice(cachedCollections.indexOf(collection), 1)
            return $http.delete('/api/collections/' + collection.id)
                .then(function() {
                    
                })
        },
        createProduct: function(data) {
            return $http.post('/api/products', data)
                .then(function(product) {
                    cachedProducts.push(product.data)
                    return product.data
                })
        },
        editProduct: function(id, data) {
            return $http.put('/api/products/' + id, data)
                .then(function(product) {
                    return product.data
                })
        },
        deleteProduct: function(product) {
            cachedProducts.splice(cachedProducts.indexOf(product), 1)
            return $http.delete('/api/products/' + product.id)
                .then(function() {
                })
        }
    }



});
