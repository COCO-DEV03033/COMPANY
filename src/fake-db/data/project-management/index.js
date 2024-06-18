import mock from '@/fake-db/mock.js'

const data = {
  projects: [    
      {
        'userID':317,
        'title': 'website',
        'devField': 'Web',
        'skills': [Vue.js, ReactJS, Laravel, MongoDB],
        'location': 'US',
        'type': 'Hourly',
        'site': 'Upwork',
        'potentialBudget': '2340',
        'earnings': [
          {
            'date': '3',
            'cost': '1300'
          }
        ],        
        'description': 'web development',        
        'status': 'Completed',
        'note': 'asdf'
      }   
  ]
}


mock.onGet('/api/project-management/projects').reply(() => {
  return [200, JSON.parse(JSON.stringify(data.projects)).reverse()]
})

// GET: Fetch Single User Details
mock.onGet(/\/api\/project-management\/projects\/\d+/).reply((request) => {

  const userId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const user = data.projects.find((project) => project.userID === userId)

  return user ? [200, JSON.parse(JSON.stringify(user))] : [404]
})

// // POST : Add new Item
mock.onPost("/api/project-management/projects/").reply((request) => {

  // Get event from post data
  let item = JSON.parse(request.data).item

  const length = data.products.length
  let lastIndex = 0
  if(length){
    lastIndex = data.products[length - 1].id
  }
  item.id = lastIndex + 1

  data.products.push(item)

  return [201, {id: item.id}]
})

// // Update Product
// mock.onPost(/\/api\/data-list\/products\/\d+/).reply((request) => {

//   const itemId = request.url.substring(request.url.lastIndexOf("/")+1)

//   let item = data.products.find((item) => item.id == itemId)
//   Object.assign(item, JSON.parse(request.data).item)

//   return [200, item]
// })

// // DELETE: Remove Item
mock.onDelete(/\/api\/user-management\/users\/\d+/).reply((request) => {

  const userId = request.url.substring(request.url.lastIndexOf('/') + 1)

  const itemIndex = data.users.findIndex((p) => p.id == userId)
  data.users.splice(itemIndex, 1)
  return [200]
})
