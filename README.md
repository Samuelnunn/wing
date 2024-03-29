# Wing

![Screenshot 2021-06-23 100903](https://user-images.githubusercontent.com/67882344/123112795-0431ca00-d40c-11eb-958b-5ba8db97f744.png)

## Links

https://wingdating.herokuapp.com/

## Used Technologies

* React.js
* Redux
* JavaScript
* Python
* PosgreSQL
* Flask
* SQLAlchemy
* Alembic

## Getting started

1. Clone this repository 

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. CD into the react-app directory
   
   ```bash
   npm install
   ```

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"

7. If image exists delete before building

   ```bash
   docker image rm registry.heroku.com/wingdating/web
   docker build --tag registry.heroku.com/wingdating/web .  
   docker push registry.heroku.com/wingdating/web
   heroku container:release web -a wingdating 
   ```

8. set up your database:

   ```bash
   heroku run -a wingdating flask db upgrade
   heroku run -a wingdating flask seed all
   ```

9. Under Settings find "Config Vars" and add any additional/secret .env variables.
