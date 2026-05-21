const express = require("express");
const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require('nodemailer');
const { log } = require("console");
const { type } = require("os");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies if needed
}));

// Connect to MongoDB
mongoose.connect("mongodb+srv://priyanka22600823:Blogger123@cluster0.3un8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


  app.get("/" , (req,res)=>{
    res.send("Express App is running")
   })

// Static file serving
app.use('/images', express.static('upload/images'));
app.use('/auth_Img', express.static('uploading/auth_Img'));

// Image storage configuration for both blog and author images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'blog') {
      cb(null, './upload/images'); // For blog image
    } else if (file.fieldname === 'auth_Img') {
      cb(null, './uploading/auth_Img'); // For author image
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Use multer.fields() to handle multiple fields (blog and auth_Img)
const upload = multer({ storage: storage });

// Image upload route for blog and author images
app.post("/upload", upload.fields([{ name: 'blog', maxCount: 1 }, { name: 'auth_Img', maxCount: 1 }]), (req, res) => {
  
  if (req.files) {
    // If the blog image is uploaded
    if (req.files.blog) {
      blogImageUrl = `http://localhost:${port}/images/${req.files.blog[0].filename}`;
    }

    // If the author image is uploaded
    if (req.files.auth_Img) {
      authImageUrl = `http://localhost:${port}/auth_Img/${req.files.auth_Img[0].filename}`;
    }
  }

  // If no images are uploaded, return a 400 error
  if (!blogImageUrl && !authImageUrl) {
    return res.status(400).json({ success: false, message: "At least one image (blog or author image) must be uploaded" });
  }

  // const blogImageUrl = `http://localhost:${port}/images/${req.files.blog[0].filename}`;
  // const authImageUrl = `http://localhost:${port}/auth_Img/${req.files.auth_Img[0].filename}`;

  res.json({
    success: true,
    blogImageUrl,
    authImageUrl
  });
});

// Schema for Blog
const Blog = mongoose.model("Blog", {
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  auth_Img: {
    type: String,
    required: true,
  },
  auth_name: {
    type: String,
    required: true,
  },
  userid:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required : true
  },
  conclusion: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Users = mongoose.model('Users', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// API to add a blog
app.post('/addblog', async (req, res) => {
  const token = req.header('auth-token'); // Get token from the Authorization header
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {

    const decoded = jwt.verify(token, 'secret_ecom');

    let blogs = await Blog.find({});
    let id;
    if (blogs.length > 0) {
      let last_blog = blogs[blogs.length - 1]; // directly access the last element
      id = Number(last_blog.id) + 1;
    } else {
      id = 1;
    }

    const auth_name = decoded.user.name;
    const email = decoded.user.email;

    let auth_Img = req.body.auth_Img;

    if (!auth_Img) {
      return res.status(400).json({ success: false, message: "Profile image is required" });
    }

    const blog = new Blog({
      id: id,
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      auth_Img: auth_Img,
      auth_name: auth_name,
      email : email,
      userid:decoded.user.id,
      conclusion: req.body.conclusion,
    });

    await blog.save();
    console.log("Blog saved successfully");
    res.json({
      success: true,
      title: req.body.title,
    });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({ success: false, message: "Error saving blog" });
  }
});

// API to delete a blog
app.post('/removeblog', async (req, res) => {
  try {
    const blog = await Blog.findOne({ id: req.body.id });
    const blogImage = blog.image.split('/').pop()
    const authImage = blog.auth_Img.split('/').pop()
    if (blog.image) {
      fs.unlink(`upload/images/${blogImage}` , () => {})
    }
    
    if (blog.auth_Img) {
      fs.unlink(`uploading/auth_Img/${authImage}` , () => {})
    }
    await Blog.findOneAndDelete({id : req.body.id})
    console.log("Blog removed successfully");
    res.json({
      success: true,
      title: req.body.title
    });
  } catch (error) {
    console.error("Error removing blog:", error);
    res.status(500).json({ success: false, message: "Error removing blog" });
  }
});

// API to fetch all blogs
app.get('/allblogs', async (req, res) => {
  try {
    let blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
});

// User schema for registration and login


// User Registration API

app.post('/signup',  async (req, res) => {
  try {
    // Check if email already exists
    let check = await Users.findOne({ email: req.body.email , isActive : false});
    if (check) {
      return res.status(400).json({ success: false, errors: "This email already exists, Sign Up with a unique email!" });
    }

    

    // Create user without activation
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isActive: false,
    });

    await user.save();

    // Generate activation token with an expiration time
    const activationToken = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '1h' }); // Token expires in 1 hour

    // Send activation link via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ootytour119@gmail.com', // Replace with your email
        pass: 'qqth viqn jgub epnm'    // Replace with your email password
      }
    });

    const activationLink = `http://localhost:4000/activate/${activationToken}`;

    const mailOptions = {
      from: 'ootytour119@gmail.com',
      to: req.body.email,
      subject: 'Account Activation',
      text: `Please click the following link to activate your account: ${activationLink}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true,activationToken, message: "Signup successful. Please check your email to activate your account." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Error during signup" });
  }
});

const checkInactiveUsers = async () => {
  try {
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);

    const inactiveUsers = await Users.find({
      isActive: false,
      date: { $lte: oneHourAgo }
    });

    if (inactiveUsers.length > 0) {
      for (const user of inactiveUsers) {
        await Users.deleteOne({ _id: user._id });
        console.log(`Deleted inactive user with email: ${user.email}`);
      }
    } else {
      console.log("No inactive users found to delete.");
    }
  } catch (error) {
    console.error("Error checking for inactive users:", error);
  }
};

setInterval(checkInactiveUsers, 600000);


// User Login API
app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user.isActive) {
      return res.status(400).json({ success: false, message: 'Account is not activated. Please check your email.' });
    }
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user._id,
            name:user.name,
            email : user.email
          }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
      } else {
        res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.json({ success: false, errors: "Wrong email id" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});

app.get('/activate/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the activation token
    jwt.verify(token, 'secret_ecom', async (err, decoded) => {
      if (err) {
        return res.status(400).json({ success: false, message: 'Invalid or expired activation token.' });
      }

      // Find user by the ID in the decoded token
      const user = await Users.findById(decoded.userId);

      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found.' });
      }

      // Activate the user and clear the token
      user.isActive = true;
      await user.save();

      res.json({ success: true, message: 'Account activated successfully. You can now log in.' });
    });
  } catch (error) {
    console.error("Error during activation:", error);
    res.status(500).json({ success: false, message: 'Error during account activation' });
  }
});


// User Profile API to get current user's name based on JWT token
app.get('/getuser', async (req, res) => {
  const token = req.header('auth-token'); // Get token from the Authorization header
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'secret_ecom');
    const userId = decoded.user.id;
    
    // Find user by ID and return user details
    const user = await Users.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, id: user._id, name: user.name });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});
const fs = require("fs");
// API to delete user account
app.post('/deleteaccount', async (req, res) => {
  const token = req.header('auth-token'); // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // Verify the token and extract user data
    const decoded = jwt.verify(token, 'secret_ecom');
    const userId = decoded.user.id;

    // Find and delete the user from the database
    const user = await Users.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const blogs = await Blog.find({ userid: userId });

    
    blogs.forEach(blog => {
      const blogImage = blog.image.split('/').pop()
      const authImage = blog.auth_Img.split('/').pop()
      if (blog.image) {
        fs.unlink(`upload/images/${blogImage}` , () => {})
      }
      
      if (blog.auth_Img) {
        fs.unlink(`uploading/auth_Img/${authImage}` , () => {})
      }
    });
    
    await Blog.deleteMany({ userid: userId });

    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: 'Error deleting account' });
  }
});



// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on http://localhost:${port}`);
  } else {
    console.log("Error starting the server:", error);
  }
});
