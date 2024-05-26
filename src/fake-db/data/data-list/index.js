import mock from '@/fake-db/mock.js'

const data = {
  products: [

    {
      'id':1,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      'name':'test-1',
      'company':'339',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':2,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      'name':'test-2',
      'company':'539',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':3,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      'name':'test',
      'company':'839',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':4,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-10.jpg'),
      'name':'test',
      'company':'AI',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':16,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-8.jpg'),
      'name':'test',
      'company':'Control',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':5,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-4.jpg'),
      'name':'test',
      'company':'839',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':6,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-1.jpg'),
      'name':'test',
      'company':'839',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':7,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      'name':'test',
      'company':'539',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':8,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      'name':'test',
      'company':'339',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':9,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      'name':'test',
      'company':'AI',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':10,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-9.jpg'),
      'name':'test',
      'company':'Control',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    },
    {
      'id':11,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-4.jpg'),
      'name':'test',
      'company':'Control',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':2000,
      'remark': ''

    },
    {
      'id':12,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      'name':'test',
      'company':'539',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1500,
      'remark': ''

    },
    {
      'id':13,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      'name':'test',
      'company':'839',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1700,
      'remark': ''

    },
    {
      'id':14,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      'name':'test',
      'company':'339',
      'plan':5000,
      'projectTitle':'website development using Vue.js',
      'earning': 4500,
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':2500,
      'remark': ''
      // 'usersLiked': [
      //   {
      //     name: 'Vennie Mostowy',
      //     img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
      //   },
      //   {
      //     name: 'Elicia Rieske',
      //     img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
      //   },

    },
    {
      'id':15,
      'group':1,
      'avatar': require('@/assets/images/portrait/small/avatar-s-8.jpg'),
      'name':'AI',
      'company':'339',
      'plan':5000,
      'earning': 4500,
      'projectTitle':'website development using Vue.js',
      'dev_field':'mobile',
      'cost':1000,
      'status':'',
      'clientCountry':'',
      'earning_date': '24',
      'price':1000,
      'remark': ''

    }
  ]
}


mock.onGet('/api/data-list/products').reply(() => {
  return [200, JSON.parse(JSON.stringify(data.products)).reverse()]
})

// POST : Add new Item
mock.onPost('/api/data-list/products/').reply((request) => {

  // Get event from post data
  const item = JSON.parse(request.data).item

  const length = data.products.length
  let lastIndex = 0
  if (length) {
    lastIndex = data.products[length - 1].id
  }
  item.id = lastIndex + 1

  data.products.push(item)

  return [201, {id: item.id}]
})

// Update Product
mock.onPost(/\/api\/data-list\/products\/\d+/).reply((request) => {

  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const item = data.products.find((item) => item.id == itemId)
  Object.assign(item, JSON.parse(request.data).item)

  return [200, item]
})

// DELETE: Remove Item
mock.onDelete(/\/api\/data-list\/products\/\d+/).reply((request) => {

  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const itemIndex = data.products.findIndex((p) => p.id == itemId)
  data.products.splice(itemIndex, 1)
  return [200]
})
