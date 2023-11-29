import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("Regenerating...");
  // all code here executes on the server side
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  
  // if no data found can redirect the user to another path/page
  if(!data) {
    return {
      redirect: {
        destination: '/no-data',
      }  
    }
  }

  if(data.products.length === 0) {
     // set to true renders a 404 error page instead of the normal page if no product(s) are found
    return { notFound: true };
  }

  return { 
    props: {
      products: data.products,
    },
    // regenerate this static page every 60 seconds
    revalidate: 60,
    // set to true renders a 404 error page instead of the normal page
    //notFound: true,
  };
}

export default HomePage;
