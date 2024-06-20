const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.db,
});

class DBController {
  async register(req, res) {
    {
      const { username, email, phone, password } = req.body;
      console.log(username, email, phone, password);
      try {
        const data = await pool.query(
          `SELECT * FROM public."exUser" WHERE email= $1;`,
          [email]
        ); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
          return res.status(400).json({
            error: "Email already there, No need to register again.",
          });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err)
              res.status(err).json({
                error: "Server error",
              });
            const user = {
              username,
              email,
              phone,
              password: hash,
            };
            var flag = 1; //Declaring a flag

            //Inserting data into the database

            pool.query(
              `INSERT INTO public."exUser" (username, email, phone, pass) VALUES ($1,$2,$3,$4);`,
              [user.username, user.email, user.phone, user.password],
              (err) => {
                if (err) {
                  flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                  console.error(err);
                  return res.status(500).json({
                    error: "Database error",
                  });
                } else {
                  flag = 1;
                  res
                    .status(200)
                    .send({ message: "User added to database, not verified" });
                }
              }
            );
            if (flag) {
              const token = jwt.sign(
                //Signing a jwt token
                {
                  email: user.email,
                },
                "private"
              );
            }
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: "Database error while registring user!", //Database connection error
        });
      }
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const data = await pool.query(
        `SELECT * FROM public."exUser" WHERE email= $1;`,
        [email]
      ); //Verifying if the user exists in the database
      const user = data.rows;
      if (user.length === 0) {
        res.status(400).json({
          error: "User is not registered, Sign Up first",
        });
      } else {
        bcrypt.compare(password, user[0].pass.trim(), (err, result) => {
          //Comparing the hashed password
          if (err) {
            res.status(500).json({
              error: "Server error",
            });
          } else if (result === true) {
            //Checking if credentials match
            const token = jwt.sign(
              {
                email: email,
              },
              "private"
            );
            res.status(200).json({
              token: token,
            });
          } else {
            //Declaring the errors
            if (result != true)
              res.status(400).json({
                error: "Enter correct password!",
              });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Database error occurred while signing in!", //Database connection error
      });
    }
  }
}
module.exports = new DBController();
