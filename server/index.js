// install this: npm i axios express socket.io
// install this: npm i socket.io-client
const express = require("express")
const { json } = require("body-parser")
const cors = require("cors")
// const session = require("express-session")
const massive = require("massive")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")
const connectionString = require("../config.js").massive
const { secret } = require("../config.js").session
const { domain, clientID, clientSecret } = require("../config").auth0
const http = require("http")
const socketIo = require("socket.io")
const axios = require("axios")
const port = process.env.PORT || 3001

// const io = socketIo(server) // < Interesting!
const controller = require("./controller/controller")

var app = require("express")(),
  server = require("http").createServer(app),
  io = require("socket.io")(server),
  session = require("express-session")({
    secret: secret,
    resave: true,
    saveUninitialized: true
  }),
  sharedsession = require("express-socket.io-session")
io.use(
  sharedsession(session, {
    autoSave: true
  })
)

const index = require("./../routes/index")
app.use(index)

app.use(json())
app.use(cors())
// app.use(session)

io.use(sharedsession(session))

massive(connectionString)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log)

//Auth0
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      userList.push(profile)
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            const db = app.get("db")
            db
              .createUserByAuth([
                profile.id,
                profile.displayName,
                profile.picture
              ])
              .then(created => {
                return done(null, created[0])
              })
          } else {
            return done(null, response[0])
          }
        })
    }
  )
)

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})



app.get("/login", passport.authenticate("auth0"), function(req, res, next) {
  req.session.user = req.user 
  console.log(req.sessionID)
  console.log()
  res.redirect("http://localhost:3000/student")
})

//SOCKET.IO STARTS
let interval

let userList = []
io.sockets.on("connection", socket => {
  console.log("New client connected")

  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000)
  socket.on("disconnect", () => {
    console.log(socket.handshake.session)

    console.log("Client disconnected")
  })
})

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get("http://localhost:3001/api/questions")
   
    console.log(socket.handshake.session)
    console.log(socket.handshake)
    socket.emit("FromAPI", res.data.concat(userList)) // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}
app.get("/api/questions", (req, res, next) => {
  req.app
    .get("db")
    .get_all_questions()
    .then(response => res.json(response))
})

//SOCKET.io ENDS

//Endpoints

//DELETE OLD END POINTS /api/questions


app.get("/api/me", function(req, res) {
  if (!req.user) {
    return res.status(404)
  }
  res.status(200).json(req.session.user)
})


app.get("/api/users/:id", (req, res, next) => {
  const dbInstance = req.app.get("db")
  dbInstance
    .getUserByAuthId([req.params.id])
    .then(user => {
      res.status(200).json(user)
    })
    .catch(console.log)
})

app.get("/api/users", controller.getActiveUsers)



server.listen(port, () => console.log(`Listening on port ${port}`))
