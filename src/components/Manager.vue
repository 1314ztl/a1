<template>
	<div class="flex h-screen w-screen overflow-hidden bg-gradient p-8 gap-8">
		<!-- 左侧聊天区域 -->
		<div class="w-1/4 flex flex-col bg-white/95 rounded-2xl shadow-2xl overflow-hidden card-hover backdrop-blur-2xl border border-white/20">
			<div class="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 text-white p-6">
				<h2 class="text-xl font-bold tracking-wide flex items-center gap-3">
					<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
						</svg>
					</span>
					AI 智能助手
				</h2>
			</div>
			
			<div class="flex-1 overflow-y-auto p-6 custom-scrollbar" id="chatMessages">
				<div class="mb-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 text-gray-800 max-w-[85%] message-bubble backdrop-blur-sm border border-blue-100/50">
					您好！我是智能家居助手，请告诉我您需要什么帮助？
				</div>
			</div>
			
			<div class="border-t border-gray-100/50 p-6 bg-gradient-to-b from-gray-50/50 to-white/30 backdrop-blur-xl">
				<div class="flex flex-col gap-4">
					<div class="relative">
						<input type="text" v-model="userNeeds" 
							class="w-full border-0 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all input-style text-gray-700 placeholder-gray-400 shadow-inner-lg" 
							placeholder="请输入您的需求..." 
							@keyup.enter="handleTask12">
						<div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500/50">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
							</svg>
						</div>
					</div>
					<div class="flex gap-3">
						<button @click="handleTask1" 
							class="btn flex-1">
							<span>分析</span>
						</button>
						<button @click="handleTask2" 
							class="btn flex-1">
							<span>生成</span>
						</button>
						<button @click="handleTask12" 
							class="btn flex-1" style="--fancy-button-gradient-0: #10b981; --fancy-button-gradient-50: #059669; --fancy-button-gradient-100: #047857;">
							<span>一键完成</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 中间提示区域 -->
		<div class="w-1/4 bg-white/95 rounded-2xl shadow-2xl overflow-hidden relative card-hover backdrop-blur-2xl border border-white/20">
			<div class="absolute inset-0 flex items-center justify-center bg-gradient-radial from-transparent via-white/5 to-white/10">
				<!-- 初始状态 -->
				<div v-if="promptState === 'initial'" 
					class="text-center transform transition-all duration-500 ease-in-out scale-hover">
					<div class="flex flex-col items-center gap-8">
						<div class="w-24 h-24 bg-gradient-to-br from-indigo-500 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all shadow-xl glow-effect">
							<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
							</svg>
						</div>
						<div class="space-y-2">
							<p class="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">请输入需求</p>
							<p class="text-gray-500">生成智能控制组件</p>
						</div>
					</div>
				</div>

				<!-- 加载状态 -->
				<div v-if="promptState === 'loading'" 
					class="text-center transform transition-all duration-500 ease-in-out">
					<div class="flex flex-col items-center gap-8">
						<div class="w-24 h-24 relative">
							<div class="absolute inset-0 border-4 border-blue-100 rounded-2xl"></div>
							<div class="absolute inset-0 border-4 border-blue-600 rounded-2xl animate-spin-slow glow-effect" 
								style="border-top-color: transparent; border-left-color: transparent"></div>
						</div>
						<div class="space-y-2">
							<p class="text-xl font-medium loading-text bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">AI 正在生成</p>
							<p class="text-gray-500">请稍候...</p>
						</div>
					</div>
				</div>

				<!-- 完成状态 -->
				<div v-if="promptState === 'done'" 
					class="text-center transform transition-all duration-500 ease-in-out scale-hover">
					<div class="flex flex-col items-center gap-8">
						<div class="w-24 h-24 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all shadow-xl glow-effect">
							<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
							</svg>
						</div>
						<div class="space-y-2">
							<p class="text-xl font-medium success-text">生成完成！</p>
							<p class="text-gray-500">请查看右侧面板</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 右侧组件展示区域 -->
		<div class="w-2/4 bg-white/95 rounded-2xl shadow-2xl overflow-hidden relative flex-shrink-0 card-hover backdrop-blur-2xl border border-white/20">
			<div class="flex flex-col h-full">
				<!-- 展示区标题 -->
				<div class="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl border-b border-gray-100/50 p-6">
					<h2 class="text-xl font-medium tracking-wide flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
							</svg>
						</span>
						智能控制面板
					</h2>
				</div>
				
				<!-- 内容区域 -->
				<div class="flex-1 overflow-auto">
					<!-- 默认提示界面 -->
					<div v-if="!hasUserInput" class="h-full flex items-center justify-center bg-gradient-radial from-transparent via-white/5 to-white/10">
						<div class="text-center p-10 transform hover:scale-105 transition-all max-w-lg">
							<div class="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-blue-100 via-indigo-50 to-white rounded-2xl flex items-center justify-center shadow-inner-xl glow-effect-light">
								<svg class="w-14 h-14 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
								</svg>
							</div>
							<h3 class="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 mb-4">欢迎使用智能控制面板</h3>
							<p class="text-gray-600 mb-8 text-lg">请在左侧输入您的控制需求<br/>例如："我要控制客厅的灯"</p>
							<div class="space-y-4 text-sm bg-gradient-to-br from-gray-50/80 to-white/50 p-8 rounded-2xl backdrop-blur-xl shadow-inner">
								<p class="font-medium text-gray-700 mb-4 text-lg">支持的功能</p>
								<div class="grid grid-cols-2 gap-4">
									<div class="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm">
										<span class="text-blue-500 flex-shrink-0">✓</span>
										<span class="text-gray-600">灯光控制（开关、亮度）</span>
									</div>
									<div class="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm">
										<span class="text-blue-500 flex-shrink-0">✓</span>
										<span class="text-gray-600">空调控制（温度、模式）</span>
									</div>
									<div class="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm">
										<span class="text-blue-500 flex-shrink-0">✓</span>
										<span class="text-gray-600">窗帘控制（开合）</span>
									</div>
									<div class="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm">
										<span class="text-blue-500 flex-shrink-0">✓</span>
										<span class="text-gray-600">更多设备支持中...</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 实际控制界面 -->
					<div v-else class="h-full relative">
						<div ref="result" class="absolute inset-0 overflow-auto" v-html="suchIframe"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import raceAsync from '../ts/asyncRace';
import { provide, ref, onMounted } from 'vue';
import ComponentBuilder from '../ts/ComponentBuilder';
import State_data_instance from '../js/state_data_instance';
import Sense from '../js/json_interface';
import IntSlider from './states_test/IntSlider.vue';
import BoolButton from './states_test/BoolButton.vue';
import EnumList from './states_test/EnumList.vue';

provide('isDebug', ref(true));
provide('build_component', ref(true));

const promptState = ref('initial');

const iframeLoaded = ref(false);

const suchIframe = ref(`<iframe src="http://localhost:5173/userView.html" class="scale-frame" style="width: 100%; height: 100%; border: none; -webkit-font-smoothing: antialiased;" frameborder="0" onload="window.dispatchEvent(new Event('iframeLoaded'))"></iframe>`);

const result = ref(null);
const userNeeds = ref("");
const hasUserInput = ref(false);

const JSONBegin  = "<jsonBegin>";
const JSONEnd = "<jsonEnd>";
const htmlBegin = "{htmlBegin}";
const htmlEnd = "{htmlEnd}";
const cssBegin = "{cssBegin}";
const cssEnd = "{cssEnd}"
const jsBegin = "{jsBegin}"
const jsEnd = "{jsEnd}";
const userRequire = "{userRequire}"

const builder = ref(new ComponentBuilder());
const state_data_instance = ref(State_data_instance.stateInstancePack);
const sense = state_data_instance.value.getSense();

const apiModel = ref("");
const api = ref(()=>{
	builder.value.callApi(apiModel.value).then((r)=>{
		apiResult.value= r;
	});
});
const apiResult = ref('--------');

const raceTest = ref(()=>{
	builder.value.call_api_multiple("你是谁",(v)=>{console.log(v)},(v)=>{console.log(v)});
	
});

const task1Promote = ref(
    `在智能家具管理界面自动构建场景下,系统需要根据用户对家居进行管理的需求构建出合理的页面,在当前步骤,你需要挑选出用户需求实际涉及到的家居,用户有如下需求:"${userRequire}",考虑以下哪些家居是完成这个需求所需要的,然后列出这些家居,请以
${JSONBegin}
{
	"result": [
		{
			"room_name": "房间名",
			"furniture": ["家居名1", "家居名2"]
		},
		{
			"next": "..."
		}
	]
}
${JSONEnd}的格式回复,其中json数据必须包裹在${JSONBegin} ${JSONEnd}结构中,以下是家居列表 :\n`

);
const task2Promote= ref(
    `你需要使用html和原生css,原生js,完成一个网页片段的构建,你生成的代码将会整合进一个现有网页
作为页面的一部分,此代码片段服务于智能家具管理场景,在智能家具管理界面自动构建场景下,用户有如下需求:"${userRequire}"
经过分析,以下是你可以使用的信息:
`);
const task2PromoteAdd = ref("");
const task1PromoteAdd2 = ref(
`
其中,State API Name是对数据的抽象,作为数据的唯一标识符使用,
你应当通过<ValueComponent dataApiName="State API Name value">使用他们,
根据State API Name对应项的type,valueComponent应被替换为BoolButton,IntSlider,EnumList,
你可以将这三个理解为普通的button,input type="range",和select标签,但他们封装了对数据的处理逻辑,
,例如<BoolButton dataApiName="chandelier_power_living_room" class="..."></BoolButton>,标签内部不能包含任何东西
你构建的页面应当形如

${cssBegin} styles,不用带<style>标签${cssEnd};
${htmlBegin}<div name="AIHtmlRoot"></div>${htmlEnd};
${jsBegin}js代码,只需要实现对界面的控制,不需要考虑后端接口,没有的话可以空着,不用带<script>标签${jsEnd};

<div name="AIHtmlRoot">必须作为html部分的根节点,

你的css,html,js将在同一个作用域下工作,
你可以先对需求和场景进行分析,然后再回答,生成界面之后无需进行解释

硬性要求:每一部分都要包裹在对应的{xxxbegin} {xxxend}结构中,

`
);
const task2Result = ref(null);

const task2Done = ref(false);

const task1 = ref(async () => {
	if (!userNeeds.value.trim()) {
		return;
	}
	let promote1 = task1Promote.value+state_data_instance.value.getSense().house.getFurnitureDescribeInEveryRoom();
	promote1=promote1.replace(userRequire,userNeeds.value);

	console.log(promote1);
	await builder.value.callApi(promote1).then((response) => {
		const jsonStartIndex = response.indexOf(JSONBegin) + JSONBegin.length;
		const jsonEndIndex = response.indexOf(JSONEnd);
		const jsonString = response.substring(jsonStartIndex, jsonEndIndex);
		const jsonResponse = JSON.parse(jsonString);
		try {
			task2PromoteAdd.value="";
			jsonResponse.result.forEach((r) => {
				if (r.furniture) {
					task2PromoteAdd.value+=("\n在"+r.room_name+"房间,有以下家具\n");
					r.furniture.forEach((f) => {
						const furnitureString = Sense.furnitureToString(sense.find({ r: r.room_name, f: f }));
						if (furnitureString !== undefined) {
							task2PromoteAdd.value+=furnitureString+"\n";
						} else {
							console.warn(`Furniture not found: ${f}`);
						}
					});
				} else {
					console.warn(`No furniture found for room: ${r.room_name}`);
				}
			});
		} catch (error) {
			console.error('Error processing response:', error);
		}
	});
});

onMounted(() => {
    window.removeEventListener('iframeLoaded', () => {});
});

const task2 = ref(async () => {
	if (!userNeeds.value.trim()) {
		return;
	}
	iframeLoaded.value = false;
	let promote2 = task2Promote.value + task2PromoteAdd.value + task1PromoteAdd2.value;
	promote2 = promote2.replace(userRequire, userNeeds.value);
	console.log(promote2);

	return new Promise((resolve) => {
		builder.value.call_api_multiple(promote2, (result) => {
			let v = result.value;
			
			const htmlStartIndex = v.indexOf(htmlBegin) + htmlBegin.length;
			const htmlEndIndex = v.indexOf(htmlEnd);

			const cssStartIndex = v.indexOf(cssBegin) + cssBegin.length;
			const cssEndIndex = v.indexOf(cssEnd);

			const jsStartIndex = v.indexOf(jsBegin) + jsBegin.length;
			const jsEndIndex = v.indexOf(jsEnd);

			let html = v.substring(htmlStartIndex, htmlEndIndex);
			let css = v.substring(cssStartIndex, cssEndIndex);
			let js = v.substring(jsStartIndex, jsEndIndex);

			window.theAiHtml = html;
			window.theAiCss = css;
			window.theAiJs = js;

			suchIframe.value = suchIframe.value.replace(/\s+$/, '') + ' ';
			
			const timeoutId = setTimeout(() => {
				if (!iframeLoaded.value) {
					console.warn('iframe加载超时');
					iframeLoaded.value = true;
					resolve();
				}
			}, 5000);

			const handleLoad = () => {
				clearTimeout(timeoutId);
				iframeLoaded.value = true;
				resolve();
			};

			window.addEventListener('iframeLoaded', handleLoad, { once: true });
		}, console.log);
	});
});

const task12 = ref(async () => {
	await task1.value();
	await task2.value();
	hasUserInput.value = true;
});

const handleTask1 = async () => {
	if (!userNeeds.value.trim()) {
		return;
	}
	promptState.value = 'loading';
	await task1.value();
	promptState.value = 'done';
	hasUserInput.value = true;
};

const handleTask2 = async () => {
	if (!userNeeds.value.trim()) {
		return;
	}
	promptState.value = 'loading';
	await task2.value();
	hasUserInput.value = true;
	promptState.value = 'done';
};

const handleTask12 = async () => {
	if (!userNeeds.value.trim()) {
		return;
	}
	promptState.value = 'loading';
	await task12.value();
	promptState.value = 'done';
};

const resetView = () => {
	hasUserInput.value = false;
	userNeeds.value = '';
	promptState.value = 'initial';
	iframeLoaded.value = false;
};
</script>

<style scoped>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active {
    animation: fadeIn 0.5s ease-out;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* 改善iframe内容显示 */
:deep(iframe) {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* 优化展示区文字样式 */
.w-2\/4 {
    width: 50%;
    flex: 0 0 50%;
    position: relative;
    border-left: 1px solid #e5e7eb;
}

/* 确保内容清晰显示 */
.scale-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}

/* 添加文字渲染优化 */
.absolute.inset-0 {
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* 优化展示区标题样式 */
.bg-white\/80.backdrop-blur-sm {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.text-lg.font-medium.text-gray-700 {
    letter-spacing: 0.01em;
}

/* 修改根容器样式 */
.flex.h-screen.w-screen {
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f3f4f6;
}

/* 统一卡片样式 */
.rounded-xl {
    border-radius: 1rem;
}

.shadow-lg {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
}

.shadow-lg:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

/* 调整间距 */
.gap-6 {
    gap: 1.5rem;
}

.p-6 {
    padding: 1.5rem;
}

/* 确保背景色统一 */
.bg-white {
    background-color: rgba(255, 255, 255, 0.95);
}

.bg-gray-100 {
    background-color: #f3f4f6;
}

/* 按钮样式优化 */
button {
    font-weight: 500;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
}

/* 输入框样式优化 */
input {
    height: 42px;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease-in-out;
}

input:focus {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 底部操作区样式 */
.border-t {
    background-color: #fafafa;
}

/* 确保按钮文字居中 */
.flex.gap-2 {
    justify-content: space-between;
}

/* 按钮悬浮效果 */
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button:active {
    transform: translateY(0);
}

/* 默认提示界面样式 */
.space-y-2 > * + * {
    margin-top: 0.5rem;
}

/* 图标动画 */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.w-20 {
    animation: pulse 2s infinite ease-in-out;
}

/* 文字渐变效果 */
.text-gray-900 {
    background: linear-gradient(120deg, #2563eb, #1d4ed8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* 添加渐变背景 */
.bg-gradient {
    background: linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

/* 调整文字颜色以提高在新背景上的可读性 */
.text-gray-600 {
    color: rgba(75, 85, 99, 0.9);
}

.text-gray-500 {
    color: rgba(107, 114, 128, 0.9);
}

/* 新增卡片悬浮效果 */
.card-hover {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
}

.card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.12),
        0 4px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.98);
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.2);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.3);
}

/* 消息气泡效果 */
.message-bubble {
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    animation: messageSlide 0.3s ease-out;
}

@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 输入框样式优化 */
.input-style {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.input-style:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
    background: rgba(255, 255, 255, 0.98);
}

/* 按钮样式优化 */
.button-style {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    letter-spacing: 0.025em;
}

.button-style:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 加载动画优化 */
.animate-spin-slow {
    animation: spin 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* 径向渐变背景 */
.bg-gradient-radial {
    background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%);
}

/* 缩放悬浮效果 */
.scale-hover {
    transition: transform 0.3s ease;
}

.scale-hover:hover {
    transform: scale(1.02);
}

/* 加载文字动画 */
.loading-text {
    animation: pulse 1.5s infinite;
}

/* 成功文字样式 */
.success-text {
    background: linear-gradient(120deg, #059669, #10B981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* 修改背景渐变 */
.bg-gradient {
    background: linear-gradient(135deg, 
        rgba(139, 92, 246, 0.92) 0%, 
        rgba(59, 130, 246, 0.88) 50%, 
        rgba(37, 99, 235, 0.84) 100%
    );
    background-attachment: fixed;
}

/* 优化卡片透明度和模糊效果 */
.bg-white\/95 {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
}

/* 添加阴影过渡效果 */
.shadow-lg {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.shadow-lg:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

/* 发光效果 */
.glow-effect {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    animation: glow 2s infinite alternate;
}

.glow-effect-light {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    animation: glow-light 2s infinite alternate;
}

@keyframes glow {
    from {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    to {
        box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
    }
}

@keyframes glow-light {
    from {
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.1);
    }
    to {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
    }
}

/* 内阴影效果 */
.shadow-inner-lg {
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
}

.shadow-inner-xl {
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.08);
}

/* 背景渐变优化 */
.bg-gradient {
    background: linear-gradient(135deg, 
        rgba(139, 92, 246, 0.92) 0%, 
        rgba(59, 130, 246, 0.88) 50%, 
        rgba(37, 99, 235, 0.84) 100%
    );
    background-attachment: fixed;
}

/* 卡片悬浮效果增强 */
.card-hover {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
}

.card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.12),
        0 4px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.98);
}

/* 按钮样式增强 */
.button-style {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.03em;
    position: relative;
    overflow: hidden;
}

.button-style::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: 0.5s;
}

.button-style:hover::before {
    left: 100%;
}

/* 输入框样式增强 */
.input-style {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;
}

.input-style:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
    background: rgba(255, 255, 255, 0.98);
}

/* 消息气泡效果增强 */
.message-bubble {
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    animation: messageSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 加载动画优化 */
.animate-spin-slow {
    animation: spin 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* 成功状态文字效果 */
.success-text {
    background: linear-gradient(120deg, #059669, #10B981, #34D399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

/* 滚动条样式优化 */
.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.2);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.4);
}

/* 新增毛玻璃效果 */
.backdrop-blur-2xl {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

/* 功能卡片样式优化 */
.bg-white\/50 {
    background: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
}

.bg-white\/50:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 新增花哨按钮样式 */
.btn {
  --fancy-button-gradient-0: #8d49fd;
  --fancy-button-gradient-50: #7f56f3;
  --fancy-button-gradient-100: #5691f3;
  --fancy-button-inner-shadow-top: rgba(233, 209, 255, 0.2);
  --fancy-button-inner-shadow-top-lg: rgba(9, 12, 60, 0.1);
  --fancy-button-inner-shadow-bottom: rgba(137, 222, 246, 0.3);
  --fancy-button-shine-top: #e9d1ff;
  --fancy-button-shine-bottom: #adfff9;
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  text-shadow: 0px 0.5px 0.5px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  appearance: none;
  border: none;
  outline: none;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  z-index: 1;
  border-radius: 25px;
  color: #fff;
  background-image: linear-gradient(
    to bottom,
    var(--fancy-button-gradient-0) 0%,
    var(--fancy-button-gradient-50) 50%,
    var(--fancy-button-gradient-100) 100%
  );
  box-shadow:
    0px 4px 12px rgba(9, 12, 60, 0.15),
    0px 2px 8px rgba(9, 12, 60, 0.15),
    0px 1px 3px var(--fancy-button-inner-shadow-top-lg),
    inset 0px 1px 1px var(--fancy-button-inner-shadow-top),
    inset 0px -1px 3px var(--fancy-button-inner-shadow-bottom);
}

@keyframes shine {
  0% {
    left: -100px;
  }
  60% {
    left: 100%;
  }
  to {
    left: 100%;
  }
}

.btn::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -100px;
  width: 50px;
  height: 200%;
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(45deg);
  pointer-events: none;
  animation: shine 3s ease-in-out infinite;
  mix-blend-mode: soft-light;
  z-index: 2;
}

.btn:hover::after {
  animation-duration: 1.5s;
}

.btn span {
  display: block;
  padding: 12px 24px;
  border-radius: inherit;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(
    to bottom,
    var(--fancy-button-shine-top),
    transparent 8px
  );
  background-position: 0 -6px;
  background-repeat: no-repeat;
  z-index: 1;
}

.btn span:before,
.btn span:after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: var(--fancy-button-shine-bottom);
  transition:
    opacity 0.25s,
    transform 0.25s;
  will-change: transform;
}

.btn span:before {
  width: 92px;
  height: 8px;
  bottom: -4px;
  opacity: 0.75;
  filter: blur(6px);
}

.btn span:after {
  width: 112px;
  height: 1px;
  bottom: 0;
  opacity: 0.9;
  filter: blur(1px);
}

.btn:hover span:before {
  opacity: 0.8;
  transform: translateX(-50%) scale(1.25);
}

.btn:hover span:after {
  opacity: 1;
}

/* 移除旧的按钮样式 */
button.button-style {
  box-shadow: none;
  letter-spacing: normal;
}

button.button-style::before {
  display: none;
}

button.button-style:hover::before {
  display: none;
}
</style>