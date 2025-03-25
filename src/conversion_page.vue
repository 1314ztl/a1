<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
    <div
        class="h-screen w-full max-w-4xl mx-auto shadow-lg flex flex-col transition-colors duration-300"
        :class="isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <!-- 顶部导航 -->
        <header
            class="flex items-center justify-between px-6 py-4 border-b transition-colors duration-300"
            :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'" >
            <div class="flex items-center gap-3">
                <img :src="aiAvatarUrl"
                    alt="AI头像"
                    class="w-10 h-10 rounded-full object-cover" />
                <h1 class="text-xl font-semibold transition-colors duration-300"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    智能助手
                </h1>
            </div>
            <div class="flex items-center gap-2">
                <button
                    class="!rounded-button p-2 transition-colors duration-300"
                    :class="isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
                    @click="toggleDarkMode">
                    <i class="fas transition-all duration-300"
                        :class="[isDarkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-600']">
                    </i>
                </button>
                <button class="!rounded-button p-2" :class="isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
                    <i class="fas fa-cog" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">

                    </i>
                </button>
            </div>
        </header>
        <!-- 对话内容区域 -->
        <div class="flex-1 overflow-y-auto p-4" ref="chatContainer">
            <div v-for="(message, index) in messages" :key="index" class="mb-4">
                <div :class="{
                        'flex justify-end': message.isUser,
                        'flex justify-start': !message.isUser}">
                    <div :class="['max-w-[70%] rounded-lg p-3 relative',
                            message.isUser
                                ? 'bg-blue-400 text-white'
                                : isDarkMode
                                ? 'bg-gray-700 text-gray-200'
                                : 'bg-gray-50 text-gray-800']">
                        <p class="text-sm">{{ message.content }}</p>

                        <span class="text-xs mt-1 block" :class="message.isUser ? 'text-blue-50' : 'text-gray-400'">
                            {{ message.time }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="isTyping" class="flex items-center gap-2 text-gray-500">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="text-sm">AI 正在思考...</span>
            </div>
        </div>
        <!-- 底部输入区域 -->
        <div class="border-t p-4">
            <div class="flex items-end gap-4">
                <div class="flex-1 relative">
                    <textarea v-model="inputMessage"
                        @keydown.enter.prevent="sendMessage"
                        placeholder="请输入您的问题..."
                        :class="[
                            'w-full resize-none rounded-lg border p-3 pr-12 focus:outline-none min-h-[44px] max-h-32 transition-colors duration-300',
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                        ]":rows="textareaRows"></textarea>
                    <div class="absolute right-3 bottom-3 flex gap-2">
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="far fa-smile"></i>
                        </button>
                        <button class="text-gray-400 hover:text-gray-600">
                            <i class="far fa-image"></i>
                        </button>
                    </div>
                </div>
                <button @click="sendMessage"
                    class="!rounded-button bg-blue-400 text-white px-6 py-3 h-11 hover:bg-blue-500 whitespace-nowrap transition-colors duration-200"
                    :disabled="!inputMessage.trim()">
                    发送
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
const isDarkMode = ref(false);
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};
// 从localStorage恢复暗黑模式设置
onMounted(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
        isDarkMode.value = JSON.parse(savedMode);
    }
});
// 监听暗黑模式变化并保存到localStorage
watch(isDarkMode, (newVal) => {
    localStorage.setItem('darkMode', JSON.stringify(newVal));
});
const aiAvatarUrl =
    'https://ai-public.mastergo.com/ai/img_res/b335ee5cfff04d99a8b6fb03891d4555.jpg';
const chatContainer = ref<HTMLElement | null>(null);
const inputMessage = ref('');
const isTyping = ref(false);
const messages = ref([
    {
        content: '你好!我是你的AI助手,有什么我可以帮你的吗？',
        isUser: false,
        time: '14:00'
    },
    {
        content: '我想了解一下关于人工智能的最新发展。',
        isUser: true,
        time: '14:01'
    },
    {
        content:
            '人工智能正在快速发展,最新的突破包括大语言模型/自动驾驶技术和医疗诊断等领域.需要我详细介绍某个特定方向吗？',
        isUser: false,
        time: '14:01'
    }
]);
const textareaRows = computed(() => {
    const lines = inputMessage.value.split('\n').length;
    return Math.min(Math.max(1, lines), 5);
});
const scrollToBottom = async () => {
    await nextTick();
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};
const sendMessage = async () => {
    if (!inputMessage.value.trim()) return;
    const currentTime = new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    messages.value.push({
        content: inputMessage.value,
        isUser: true,
        time: currentTime
    });
    inputMessage.value = '';
    await scrollToBottom();
    // 模拟AI回复
    isTyping.value = true;
    setTimeout(async () => {
        isTyping.value = false;
        messages.value.push({
            content: '我理解您的问题,让我为您详细解答...',
            isUser: false,
            time: new Date().toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
        await scrollToBottom();
    }, 2000);
};
onMounted(() => {
    scrollToBottom();
});
</script>
<style scoped>
.typing-indicator {
    display: flex;
    gap: 4px;
}
.typing-indicator span {
    width: 8px;
    height: 8px;
    background-color: #bfdbfe;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
}
.typing-indicator span:nth-child(1) {
    animation-delay: -0.32s;
}
.typing-indicator span:nth-child(2) {
    animation-delay: -0.16s;
}
@keyframes bounce {
    0%,
    80%,
    100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1.0);
    }
}
textarea::-webkit-scrollbar {
    width: 6px;
}
textarea::-webkit-scrollbar-track {
    background: transparent;
}
textarea::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.3);
    border-radius: 3px;
}
textarea::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.5);
}
</style>