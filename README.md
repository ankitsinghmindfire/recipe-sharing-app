Steps for running Recipe Sharing APP

Clone the repository: https://github.com/ankitsinghmindfire/recipe-sharing-app

Navigate to the client directory: cd client 
Install client dependencies: npm install 
then start FE application : npm run dev 

Return to the project root: cd ..

Navigate to server folder:cd server
Create a .env file in the project root and configure your environment variables:
PORT=8626
URI=mongodb+srv://singhankitmindfire:Ankitsingh1234@recipes.5vcfr.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes
SECRET=your-secret-key
Replace your-secret-key with a secure secret for JWT token generation.
Start the development server : npm start
