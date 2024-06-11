import { useState, useEffect, useRef } from "react";
import "./ChatRealTime.css";
import "./Chat.css";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ENDPOINT = "http://localhost:3001"; // Địa chỉ của server Node.js

const ChatRealTime = () => {
    const navigate = useNavigate();
    const [IsOpenChat, setIsOpenChat] = useState(false);
    const [inputMess, setinputMess] = useState("");
    const [inputUser, setinputUser] = useState("");
    const [listUser, setListUser] = useState([]);
    const [NguoiMaBanMuonNhanTin, setNguoiMaBanMuonNhanTin] = useState();
    const [IdCoversation, setIdCoversation] = useState("");

    const [idValue, setidValue] = useState(null)

    const token = sessionStorage.getItem("accessToken");
    const [TinNhan, setTinNhan] = useState([]);
    const [ShowMenuAvatar, setShowMenuAvatar] = useState(false);
    const [ImageOfMe, setImageOfMe] = useState();
    const [NameOfMe, setNameOfMe] = useState();
    const [ImageUserWantMess, setImageUserWantMess] = useState();
    const chatContainerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState('');
    const [IdAdminChat, setIdAdminChat] = useState('');
    const handleShowMenuAvatar = () => {
        setShowMenuAvatar(!ShowMenuAvatar);
    };


    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.taikhoan);
                console.log('check', username)
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, [token]);

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on("message", (data) => {
            const newMessage = data.messageNe;
            setTinNhan((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log('check id value', idValue)
        const fetchListUser = async () => {
            try {
                const response = await axios.get(`${ENDPOINT}/allusers`);
                const filteredUsers = response.data.filter(
                    (user) => user.username === username
                );
                const filteredUserAdmin = response.data.filter(
                    (user) => user.username === 'admin'
                );
                setListUser(filteredUsers);
                setidValue(filteredUserAdmin[0]._id)
                setNguoiMaBanMuonNhanTin(filteredUserAdmin[0].username)

                // console.log('check user =>', filteredUsers);
                // console.log('check admin =>', filteredUserAdmin[0]._id);
            } catch (error) {
                console.error("Error fetching list of users:", error);
            }
        };


        fetchListUser();

    }, [idValue]);


    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const response = await axios.get(`${ENDPOINT}/allusers`);
                setListUser(response.data);
            } catch (error) {
                console.error("Error fetching list of users:", error);
            }
        };

        fetchListUser();
    }, []);

    const handleIconCaVoi = async () => {
        if (IdCoversation) {
            try {
                const response = await axios.post(
                    `${ENDPOINT}/api/addMessageToConversation`,
                    {
                        senderUserId: username,
                        content: "🐳",
                        conversationId: IdCoversation,
                    }
                );
                setinputMess("");
                const responseMess = await axios.post(
                    `${ENDPOINT}/api/getMessages`,
                    {
                        conversationId: IdCoversation,
                    }
                );
                setTinNhan(responseMess.data);

            } catch (error) {
                console.error("Lỗi khi gửi tin nhắn:", error);
            }
        }
    };

    const SendMessNe = async () => {
        if (!inputMess) {
            return;
        }
        console.log('check username KH 1=>', username)
        console.log('check ', IdCoversation)
        if (IdCoversation) {
            try {
                const response = await axios.post(
                    `${ENDPOINT}/api/addMessageToConversation`,
                    {
                        senderUserId: username,
                        content: inputMess,
                        conversationId: IdCoversation,
                    }
                );
                setinputMess("");
                const responseMess = await axios.post(
                    `${ENDPOINT}/api/getMessages`,
                    {
                        conversationId: IdCoversation,
                    }
                );
                setTinNhan(responseMess.data);
                console.log('tin nhan', TinNhan)
            } catch (error) {
                console.error("Lỗi khi gửi tin nhắn:", error);
            }
        }
    };



    const handlePressEnter = async (event) => {
        if (event.charCode === 13) {
            await SendMessNe();
            event.preventDefault();
        }
    };

    const handleUserIb = async () => {
        console.log('check username KH', username)
        try {
            const response = await axios.get(`http://localhost:3001/api/getUserByUsername/${username}`);
            const { userId } = response.data;
            setUserId(userId);
            // console.log('check id user', userId)

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('User not found');
            } else {

                console.log('An error occurred during the search.');
            }
        }
        const usernameAdmin = 'admin'
        try {
            const response = await axios.get(`http://localhost:3001/api/getUserByUsername/${usernameAdmin}`);
            const { userId } = response.data;
            setIdAdminChat(userId);
            console.log('check id user', userId)

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('User not found');
            } else {

                console.log('An error occurred during the search.');
            }
        }
        try {
            if (IdAdminChat, userId) {
                // Gửi yêu cầu POST đến server
                const response = await axios.post(
                    "http://localhost:3001/api/createConversation",
                    {
                        participants: [IdAdminChat, userId], // Truyền id của user đó xuống server
                    }
                );
                setIdCoversation(response.data.conversationId);
                console.log("id conver =>", IdCoversation);
            }
            if (IdCoversation) {
                const responseMess = await axios.post(
                    "http://localhost:3001/api/getMessages",
                    {
                        conversationId: IdCoversation, // Truyền id của user đó xuống server
                    }
                );
                setTinNhan(responseMess.data);

                console.log("check tin nhắn1 =>", responseMess.data);
            }



            // Nếu yêu cầu thành công, in ra thông báo "Tạo cuộc trò chuyện thành công"
            console.log("Tạo cuộc trò chuyện thành công");
            // setNguoiMaBanMuonNhanTin(Object.values(user)[2]);
            // console.log('check nguoi ban muon nhan tin', Object.values(user)[2])


            // Nếu bạn cần xử lý dữ liệu trả về từ server, bạn có thể làm ở đây
            // Ví dụ: const data = response.data;
        } catch (error) {
            // Nếu có lỗi xảy ra, in ra thông báo lỗi
            console.error("Lỗi khi tạo cuộc trò chuyện:", error);
        }
    };





    const handleOpenChat = () => {
        setIsOpenChat(!IsOpenChat);
        handleUserIb()
    };
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

        }

    }, [TinNhan]);

    return (
        <>
            <div className="container-chat">
                {!IsOpenChat ? (
                    <div className="iconCLickChat" onClick={handleOpenChat}>
                        <img
                            className="iconCLickChat-chat-avt-img"
                            src={require("../../assets/img-avata/favicon.png")}
                            alt="Avatar"
                        />
                    </div>
                ) : false}

                {IsOpenChat ? (
                    <div className="containe-chat-realtime">
                        <div className="containe-chat-realtime-top">
                            <div className="chat-avt">
                                <img
                                    className="chat-avt-img"
                                    src={require("../../assets/img-avata/favicon.png")}
                                    alt="Avatar"
                                />
                            </div>
                            <div className="chat-name">
                                <p>PhucShoe</p>
                            </div>
                            <div className="chat-off">
                                <i className="fa-solid fa-minus" onClick={handleOpenChat}></i>
                            </div>
                        </div>
                        <div
                            className="container-chat-realtime-noidungmess"

                        >

                            <div className="chat-container" ref={chatContainerRef}>
                                {TinNhan.map((message) => (
                                    <div key={message._id} className="message">
                                        <div
                                            className={`container-messs ${message.name !== NguoiMaBanMuonNhanTin
                                                ? "text-align-right justify-content-right"
                                                : ""
                                                }`}
                                        >
                                            <div className="container-messCha2">
                                                {message.username !== NguoiMaBanMuonNhanTin && (
                                                    <div className="container-noidungtinnhan2 text-align-right">
                                                        <p className="noidungtinnhan2">
                                                            {message.message}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="container-messCha">
                                                <img
                                                    className={`NoiDungChat-NoiDung-1-TinNhan-Avt ${message.name === NguoiMaBanMuonNhanTin
                                                        ? "image-Avta"
                                                        : "display-none"
                                                        }`}
                                                    src={`http://localhost:3001/public/uploads/${ImageUserWantMess}`}
                                                />
                                                {message.username === NguoiMaBanMuonNhanTin && (
                                                    <div className="container-noidungtinnhan">
                                                        <p className="noidungtinnhan">
                                                            {message.message}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="container-chat-realtime-send">
                            <div className="NoiDungChat-thanhChat-Input">
                                <input
                                    className="NoiDungChat-thanhChat-Input-1"
                                    placeholder="Aa"
                                    type="text"
                                    value={inputMess}
                                    onChange={(e) => setinputMess(e.target.value)}
                                    onKeyPress={(event) => handlePressEnter(event)}
                                ></input>
                            </div>
                            <div className="NoiDungChat-thanhChat-3">
                                <img
                                    onClick={handleIconCaVoi}
                                    className="CavoiCute"
                                    alt="🐳"
                                    src="https://static.xx.fbcdn.net/images/emoji.php/v9/tde/1.5/20/1f433.png"
                                ></img>
                            </div>
                        </div>
                    </div>
                ) : false}
            </div>
        </>
    );
};

export default ChatRealTime;
