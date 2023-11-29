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

export async function getStaticProps() {
  console.log("Regenerating...")
  // all code here executes on the server side
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return { 
    props: {
      products: data.products,
    },
    // regenerate this static page every 60 seconds
    revalidate: 60,
  };
}

export default HomePage;
