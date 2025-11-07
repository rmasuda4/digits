# digits

Digits is an application that allows users to:

- Register an account.
- Create and manage a set of contacts.
- Add timestamped notes about their interactions with each contact.

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

### 2. Clone this repository
You can use GitHub Desktop or the terminal.
Using the terminal:

git clone https://github.com/rmasuda4/digits.git
cd digits

### 3. Create a PostgreSQL database
Before setting up Prisma, create the database that this app will use using either pgAdmin or the terminal:

createdb digits

This creates an empty PostgreSQL database named digits that Prisma will connect to.

### 4. Configure environment variables
Copy the sample environment file to create your local .env file:

cp .env.sample .env

Then open .env in a text editor.
Make sure the DATABASE_URL line matches your local PostgreSQL setup.
For example:

DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/digits"

If you’re using a different PostgreSQL username, password, or port, adjust it here.

### 5. Install dependencies
Install all required Node.js packages using npm:

npm install
This will download everything needed for Next.js, Prisma, and authentication.

### 6. Run the database migrations
Next, tell Prisma to set up the database tables:

npx prisma migrate dev

This creates the database schema defined in prisma/schema.prisma.

### 7. Seed the database
Now add the default users and contacts from config/settings.development.json:

npx prisma db seed

This creates:

admin@foo.com (role: ADMIN, password: changeme)

john@foo.com (role: USER, password: changeme)

Default sample contacts for both users.

### 8. Start the application
Once the database is ready, start the development server:

npm run dev
Then open your browser and go to:

http://localhost:3000

You can log in using either:

admin@foo.com / changeme

john@foo.com / changeme

That’s it — your Digits application should now be up and running locally

---

## UI Guide 

### Landing Page
<img src="doc/landing.png" width="600">

Once you open the localhost this is the page you should see. You can log in to the top right or sign up yourself. Here are example log in information.
admin@foo.com (role: ADMIN, password: changeme)
john@foo.com (role: USER, password: changeme)

### Contact List
<img src="doc/contactlistlanding.png" width="600">

After logging in you can click on the contact list and this is what you should see(as shown above). 

### Note feature
From here you can scroll down to see various information about each contact and then add notes using the text box attached to the 'card'. And one can also click the reset button underneath their entered text to delete it. Example shown below:

<img src="doc/contactlistnote.png" width="600">

### Adding Contact
You could also navigate to the AddContact page using the navbar on the top left. You can use this form to add your own custom contact cards. As shown below:

<img src="doc/addcontact.png" width="600">

After submitting the form, you should navigate back to the list tab using the navbar to see your new card. 

<img src="doc/newcontactlist.png" width="600">

### Edit Cards
You can also edit any contact cards using the blue edit link on the bottom left. Clicking on it will open up a form you can edit any way you like. As shown below:

<img src="doc/editcontact.png" width="600">

### Admin Features
You can sign out of whatever account you are logged in with by clicking on the top right and then clicking sign out. Logging in as an admin gives you access to more features. Different users gain access to different contacts, admin@foo.com has access to a different default card than john@foo. Shown below:

<img src="doc/adminlist.png" width="600">

Clicking on the Admin tab on the navbar shows viewing access to every user's underneath the admin contact card as shown below. 

<img src="doc/admintab.png" width="600">

This completes your instilation and UI tour for our digits contact card. 