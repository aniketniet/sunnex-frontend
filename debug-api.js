fetch('http://sunnexgulf.com/admin/public/api/home-data')
  .then(response => response.json())
  .then(data => {
    console.log('Services structure:');
    if (data.data && data.data.services) {
      data.data.services.forEach(service => {
        console.log(`ID: ${service.id}, Category:`, service.category);
      });
    }
  })
  .catch(error => console.error('Error:', error));