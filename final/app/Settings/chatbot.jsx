import { StyleSheet, View, Text, Image, ScrollView, Pressable, Dimensions, Appearance, Switch, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/Header';
import { UserData } from '../../components/UserData';
import { useLDM } from '../../components/LDM';
import Sign_in from '../Settings/Login/Sign_in';
import Create_account from '../Settings/Login/Create_account';

export default function AssistantScreen() {

  const [chatMode, setChatMode] = useState(null);
  const [messages, setMessages] = useState([

    {
      role: "assistant",
      content: "您好，請問本獅可以如何協助您？",
    },

  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
  const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

  const startTicketMode = () => {

    setChatMode("ticket");

    setMessages([

      {

        role: "system",
        content:
          "你是北師美術館的票券客服，請用繁體中文簡短回答票券、購票、退票與入場相關問題。票價：一般票300元，北教大專屬票200元，僅國立台北教育大學學生、老師、職員可購買；優待票150元，僅身心障礙者、65歲以上、12歲以下可購買。購票方式可以透過官網或現場購買。退票政策是購票後7天內可全額退票，7天後不予退票。",
      },

      {
        role: "assistant",
        content: "請問您想詢問購票流程、我的票券、退票，還是入場使用問題呢？",
      },

    ]);

  };

  const startTransportMode = () => {

    setChatMode("transport");
    setMessages([

      {
        role: "system",
        content:
          "你是北師美術館交通客服，請用繁體中文回答交通、地址、捷運、公車與停車資訊。參觀資訊：開放時間為週二至週日10:00-18:00，開放期間任何時刻都能來參觀，每週一休館，地址是台北市大安區和平東路二段134號。北師美術館地址是台北市大安區和平東路二段134號。\n\n捷運：搭乘捷運文湖線至科技大樓站，出站後步行五分鐘即可抵達。\n\n公車：復興路口站可搭乘 237、295、680、688、復興幹線；國立台北教育大學站可搭乘 15、18、52、72、211、235、237、278、284、662、663、和平幹線。\n\n停車：校內有停車場，收費標準為每小時30元，全天最高收費150元。",
      },

      {

        role: "assistant",
        content:
          "北師美術館地址是台北市大安區和平東路二段134號。我們在台北市大安區和平東路二段134號唷！可以搭乘捷運在科技大樓站或公車國立台北教育大學站下車",
      },

    ]);

  };

  const startLostMode = () => {

    setChatMode("lost");

    setMessages([

      {
        role: "system",
        content:
          "你是北師美術館遺失物協尋客服，請協助使用者整理遺失物資訊，包含物品名稱、外觀、顏色、遺失時間、遺失地點與聯絡方式。",
      },

      {
        role: "assistant",
        content:
          "請描述您的遺失物特徵，例如物品名稱、顏色、大小、遺失時間與可能遺失地點，我會協助您整理通報內容。\n也可直接電話聯繫：(02) 2732-1104",
      },

    ]);

  };

  const startOtherMode = () => {
    setChatMode("other");
    setMessages([

      {
        role: "system",
        content:
          "你是北師美術館的 AI 客服，請用台灣繁體中文、親切簡短地回答訪客問題。嚴禁偏題，如果不知道答案，請訪客聯絡本館電話：(02) 2732-1104 轉 83401 或 63492。",
      },

      {
        role: "assistant",
        content: "請直接輸入您的問題，我會盡力協助您。",
      },
    ]);

  };

  const sendMessage = async () => {

    if (!inputText.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: inputText,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputText("");
    setLoading(true);

    try {
      const response = await axios.post(
        GROQ_URL,

        {
          model: "llama-3.1-8b-instant",
          messages: updatedMessages,
          temperature: 0.5,
        },

        {

          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },

        }

      );

      const aiResponse = response.data.choices[0].message;
      setMessages([...updatedMessages, aiResponse]);

    } catch (error) {
      console.log("Groq 連線錯誤：", error.response?.data || error.message);
      setMessages([
        ...updatedMessages,

        {
          role: "assistant",
          content: "目前連線發生問題，請稍後再試，或聯絡本館電話：(02) 2732-1104 轉 83401 或 63492。",
        },

      ]);

    } finally {
      setLoading(false);
    }

  };

  const quickButtons = [

    { title: "購票及票券問題", onPress: startTicketMode },
    { title: "交通資訊", onPress: startTransportMode },
    { title: "遺失物協尋", onPress: startLostMode },
    { title: "其他問題", onPress: startOtherMode },

  ];

  return (

    <View style={styles.container}>

      <Text style={styles.title}>北獅小助手</Text>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === "user" ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.content}</Text>
            </View>

          ))}

        {chatMode === null && (
          <View style={styles.quickBox}>
            {quickButtons.map((item) => (
              <TouchableOpacity
                key={item.title}
                style={styles.quickButton}
                onPress={item.onPress}
              >
                <Text style={styles.quickButtonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {loading && (
          <ActivityIndicator
            size="small"
            color="#F8E364"
            style={{ marginVertical: 12 }}
          />

        )}

      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput

          style={styles.input}
          placeholder="請輸入訊息"
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
          editable={!loading}
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />

        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>{loading ? "..." : "送出"}</Text>
        </Pressable>

      </View>
      <Text style={styles.phone}>
        本館聯絡電話：{"\n"}(02) 2732-1104 轉 83401 或 63492
      </Text>
    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#000",

    paddingTop: 80,

    paddingHorizontal: 24,

  },

  title: {

    color: "#fff",

    fontSize: 22,

    fontWeight: "700",

    textAlign: "center",

    letterSpacing: 4,

    marginBottom: 32,

  },

  chatArea: {

    flex: 1,

  },

  messageBubble: {

    padding: 14,

    borderRadius: 16,

    marginBottom: 12,

    maxWidth: "82%",

  },

  assistantBubble: {

    backgroundColor: "#F8E364",

    alignSelf: "flex-start",

  },

  userBubble: {

    backgroundColor: "#fff",

    alignSelf: "flex-end",

  },

  messageText: {

    color: "#222",

    fontSize: 15,

    lineHeight: 22,

  },

  quickBox: {

    backgroundColor: "#F8E364",

    borderRadius: 16,

    padding: 14,

    marginTop: 8,

    marginBottom: 24,

    alignSelf: "flex-start",

    width: "75%",

  },

  quickButton: {

    backgroundColor: "#fff",

    borderRadius: 8,

    paddingVertical: 6,

    paddingHorizontal: 12,

    marginTop: 8,

  },

  quickButtonText: {

    color: "#222",

    fontSize: 14,

    fontWeight: "600",

  },

  inputRow: {

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#fff",

    borderRadius: 22,

    paddingHorizontal: 16,

    paddingVertical: 8,

    marginBottom: 16,

  },

  input: {

    flex: 1,

    color: "#fff",

    fontSize: 15,

  },

  sendButton: {

    marginLeft: 8,

  },

  sendText: {

    color: "#F8E364",

    fontWeight: "700",

  },

  phone: {

    color: "#fff",

    textAlign: "center",

    fontSize: 12,

    lineHeight: 20,

    marginBottom: 32,

  },

});