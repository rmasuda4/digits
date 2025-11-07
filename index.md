# digits

Digits is an application that allows users to:

- Register an account.
- Create and manage a set of contacts.
- Add notes about their interactions with each contact.

<img src="doc/landing.png" width="600">

---

## Installation

### 1. Install Node.js and PostgreSQL

Make sure you have both **Node.js (v18 or later)** and **PostgreSQL** installed on your computer.

You can download them here:  
- [Node.js](https://nodejs.org)  
- [PostgreSQL](https://www.postgresql.org/download/)

Once PostgreSQL is installed, make sure the PostgreSQL service is running.  
You can verify it by opening a terminal and running:

psql --version

---

### 2. Clone this repository
You can use GitHub Desktop or the terminal.
Using the terminal:

bash
Copy code
git clone https://github.com/rmasuda4/digits.git
cd digits

---

### 3. Create a PostgreSQL database
Before setting up Prisma, create the database that this app will use:

bash
Copy code
createdb digits
This creates an empty PostgreSQL database named digits that Prisma will connect to.

### 4. Configure environment variables
Copy the sample environment file to create your local .env file:

bash
Copy code
cp .env.sample .env
Then open .env in a text editor.
Make sure the DATABASE_URL line matches your local PostgreSQL setup.
For example:

ini
Copy code
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/digits"
If you’re using a different PostgreSQL username, password, or port, adjust it here.

### 5. Install dependencies
Install all required Node.js packages using npm:

bash
Copy code
npm install
This will download everything needed for Next.js, Prisma, and authentication.

### 6. Run the database migrations
Next, tell Prisma to set up the database tables:

bash
Copy code
npx prisma migrate dev
This creates the database schema defined in prisma/schema.prisma.

### 7. Seed the database
Now add the default users and contacts from config/settings.development.json:

bash
Copy code
npx prisma db seed
This creates:

admin@foo.com (role: ADMIN, password: changeme)

john@foo.com (role: USER, password: changeme)

Default sample contacts for both users.

### 8. Start the application
Once the database is ready, start the development server:

bash
Copy code
npm run dev
Then open your browser and go to:

👉 http://localhost:3000

You can log in using either:

admin@foo.com / changeme

john@foo.com / changeme

9. Optional: Verify ESLint setup
You can check your code for any linting issues with:

bash
Copy code
npm run lint
If everything’s configured correctly, you should see:

yaml
Copy code
✔ No ESLint warnings or errors
That’s it — your Digits application should now be up and running locally
