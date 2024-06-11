var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

var http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Đảm bảo thư mục public/images tồn tại
const uploadDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Endpoint để upload ảnh avatar

var mongoose = require("mongoose");
const cors = require("cors");
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ---------------------------------------------------------------------------------------------------
const dbUrl = "mongodb://localhost:27017/ChatPhucShoe";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("mongodb connection error:", err);
  });
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});
const Conversation = mongoose.model("Conversation", conversationSchema);
const userSchema = new mongoose.Schema({
  // Các trường khác của user
  username: String,
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  ],
});

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
});

const User = mongoose.model("User", userSchema);

var Message = mongoose.model("Message", {
  username: String,
  message: String,
});

app.post("/api/createUser", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
    });
    console.log("Check User", req.body);
    // Lưu user mới vào cơ sở dữ liệu
    await newUser.save();

    // Phản hồi với mã trạng thái 200 để cho biết tạo user thành công
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    // Phản hồi với mã trạng thái 500 để cho biết có lỗi xảy ra
    res.sendStatus(500);
  }
});
//hiển thị list tất cả các user
app.get("/allusers", async (req, res) => {
  try {
    // Lấy tất cả các người dùng từ cơ sở dữ liệu
    const users = await User.find();
    res.status(200).json(users); // Trả về danh sách các người dùng
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Tạo một endpoint để lấy danh sách các cuộc trò chuyện mà một người dùng đã tham gia
app.post("/api/conversations", async (req, res) => {
  try {
    // Lấy ID của người dùng từ request body
    const userId = req.body.userId;

    // Tìm kiếm người dùng trong cơ sở dữ liệu bằng ID
    const user = await User.findById(userId);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Lấy danh sách các cuộc trò chuyện mà người dùng đã tham gia
    const conversations = await Conversation.find({ participants: userId });

    // Trả về danh sách các cuộc trò chuyện
    res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    // Trả về lỗi nếu có lỗi xảy ra trong quá trình xử lý
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Hello login");

    console.log("email =>", req.body);
    const email = req.body.valueLogin;
    const password = req.body.password;
    // Tìm kiếm người dùng trong cơ sở dữ liệu dựa trên email`
    const user = await User.findOne({ email, password });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ message: "User not found", EC: 1 });
    }

    // Kiểm tra mật khẩu
    console.log("User đăng nhập thành công !!");
    // Phản hồi với mã trạng thái 200 và thông tin người dùng (ví dụ: token JWT) để đăng nhập thành công
    res.status(200).json({ message: "Login successful", EC: 0, _id: user });
  } catch (err) {
    console.error(err);
    // Phản hồi với mã trạng thái 500 để cho biết có lỗi xảy ra
    res.status(500).json({ message: "Internal server error" });
  }
});

// Tạo một user mới
//Click vào để bắt đầu nhắn với 1nguoi mới
// Tạo một conversation mới`
app.post("/api/createConversation", async (req, res) => {
  try {
    const { participants } = req.body;
    console.log(req.body);
    console.log("tao cuoc tro chuyen");
    // Kiểm tra xem cuộc trò chuyện đã tồn tại hay không bằng cách tìm trong cơ sở dữ liệu
    const existingConversation = await Conversation.findOne({
      participants: { $all: participants },
    });

    // Nếu cuộc trò chuyện đã tồn tại, trả về ID của cuộc trò chuyện
    if (existingConversation) {
      return res.status(200).json({ conversationId: existingConversation._id });
    }

    // Nếu cuộc trò chuyện chưa tồn tại, tiến hành tạo mới và lưu vào cơ sở dữ liệu
    const newConversation = new Conversation({
      participants: participants,
      messages: [],
    });

    await newConversation.save();

    // Phản hồi với mã trạng thái 200 và trả về ID của cuộc trò chuyện để cho biết tạo cuộc trò chuyện thành công
    res.status(200).json({ conversationId: newConversation._id });
  } catch (err) {
    console.error(err);
    // Phản hồi với mã trạng thái 500 để cho biết có lỗi xảy ra
    res.sendStatus(500);
  }
});

//Đang nhắn
// Tạo một tin nhắn mới và thêm vào conversation
app.post("/api/addMessageToConversation", async (req, res) => {
  const { senderUserId, content, conversationId } = req.body;
  console.log("check =>", conversationId);

  try {
    const user = await User.findOne({ username: senderUserId });
    console.log("mess =>", user._id);
    if (!user) {
      console.log("Sender user not found.");
      return res.status(404).send("Sender user not found.");
    }

    const newMessage = new Message({
      sender: user._id, // Use ObjectId
      username: senderUserId,
      message: content,
    });

    await newMessage.save();

    let conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).send("Conversation not found.");
    }

    conversation.messages.push(newMessage._id);
    await conversation.save();

    io.emit("message", { messageNe: newMessage });
    res.status(200).json({ messageNe: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// API để lấy tin nhắn dựa trên ID của cuộc trò chuyện
app.post("/api/getMessages", async (req, res) => {
  try {
    // Lấy ID của cuộc trò chuyện từ request body
    const { conversationId } = req.body;
    console.log("check conversationId =>", conversationId);
    // Tìm kiếm cuộc trò chuyện trong cơ sở dữ liệu bằng ID
    const conversation = await Conversation.findById(conversationId);

    // Kiểm tra xem cuộc trò chuyện có tồn tại không
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Lấy danh sách tin nhắn trong cuộc trò chuyện
    const messages = await Message.find({
      _id: { $in: conversation.messages },
    });
    console.log(messages);
    // Trả về danh sách tin nhắn
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    // Trả về lỗi nếu có lỗi xảy ra trong quá trình xử lý
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.get("/messages", (req, res) => {
//   Message.find({}, (err, messages) => {
//     res.send(messages);
//   });
// });

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.send(messages);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// ----------------LẤY ID USER BẰNG USERNAME--------------------------------------
app.get("/api/getUserByUsername/:username", async (req, res) => {
  try {
    // Extract the username from the request params
    const username = req.params.username;

    // Search for the user in the database using the username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's ID
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Đường dẫn thư mục lưu trữ file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ".png"); // Tên file mới với phần mở rộng là .png
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Lấy userId từ req.body
  const userId = req.body.idValue;
  const avatarFileName = req.file.filename; // Lấy filename của file từ req.file
  console.log("id=>", userId, "avta =>", avatarFileName);

  // Kiểm tra xem userId và avatarFileName đã được định nghĩa chưa
  if (!userId || !avatarFileName) {
    return res
      .status(400)
      .json({ message: "Invalid userId or avatarFileName" });
  }

  try {
    // Tìm và cập nhật người dùng với avatar mới
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { avt: avatarFileName } },
      { new: true, upsert: true }
    );

    // Kiểm tra xem user có tồn tại hay không
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về thông tin về file đã upload
    res.json({
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/messages", async (req, res) => {
  try {
    var message = new Message(req.body);
    await message.save();
    io.emit("message", req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

io.on("connection", (socket) => {
  // console.log("a user connected");

  // Lắng nghe sự kiện "message" từ client
  socket.on("message", async (message) => {
    console.log("Received message from client:", message);
    // Xử lý tin nhắn ở đây, ví dụ: lưu vào cơ sở dữ liệu, gửi lại cho các client khác, vv.
    try {
      // Tạo một bản ghi mới của Message và lưu vào MongoDB
      const newMessage = new Message(message);
      await newMessage.save();
      console.log("Message saved to MongoDB:", newMessage);
    } catch (error) {
      console.error("Error saving message to MongoDB:", error);
    }
  });
});

var server = http.listen(3001, () => {
  console.log("server is running on port", server.address().port);
});
