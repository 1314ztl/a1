<template>
	<div class="flex h-screen w-screen overflow-hidden bg-gray-100 p-6 gap-6">
		<!-- 左侧聊天区域 -->
		<div class="w-1/4 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
			<div class="bg-blue-600 text-white p-4">
				<h2 class="text-xl font-bold">AI 智能助手</h2>
			</div>
			
			<div class="flex-1 overflow-y-auto p-4" id="chatMessages">
				<div class="mb-4 p-3 rounded-lg bg-gray-100 text-gray-800 max-w-[80%]">
					您好！我是智能家居助手，请告诉我您需要什么帮助？
				</div>
			</div>
			
			<div class="border-t border-gray-100 p-4">
				<div class="flex flex-col gap-3">
					<input type="text" v-model="userNeeds" 
						class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
						placeholder="请输入您的需求..." 
						@keyup.enter="handleTask12">
					<div class="flex gap-2">
						<button @click="handleTask1" 
							class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
							分析
						</button>
						<button @click="handleTask2" 
							class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
							生成
						</button>
						<button @click="handleTask12" 
							class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
							一键完成
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 中间提示区域 -->
		<div class="w-1/4 bg-white rounded-xl shadow-lg overflow-hidden relative">
			<div class="absolute inset-0 flex items-center justify-center">
				<!-- 初始状态 -->
				<div v-if="promptState === 'initial'" 
					class="text-center transform transition-all duration-500 ease-in-out">
					<div class="flex flex-col items-center gap-4">
						<div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
							<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
							</svg>
						</div>
						<p class="text-gray-600 font-medium">请输入需求并点击按钮<br/>生成智能控制组件</p>
					</div>
				</div>

				<!-- 加载状态 -->
				<div v-if="promptState === 'loading'" 
					class="text-center transform transition-all duration-500 ease-in-out">
					<div class="flex flex-col items-center gap-4">
						<div class="w-16 h-16 relative">
							<div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
							<div class="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin" 
								style="border-top-color: transparent"></div>
						</div>
						<p class="text-gray-600 font-medium">AI 正在生成控制组件...</p>
					</div>
				</div>

				<!-- 完成状态 -->
				<div v-if="promptState === 'done'" 
					class="text-center transform transition-all duration-500 ease-in-out">
					<div class="flex flex-col items-center gap-4">
						<div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
							<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
							</svg>
						</div>
						<p class="text-gray-600 font-medium">组件生成完成！<br/>请查看右侧面板</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 右侧组件展示区域 -->
		<div class="w-2/4 bg-white rounded-xl shadow-lg overflow-hidden relative flex-shrink-0">
			<div class="absolute inset-0">
				<div class="w-full h-full relative">
					<!-- 展示区标题 -->
					<div class="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4 z-10">
						<h2 class="text-lg font-medium text-gray-700">智能控制面板</h2>
					</div>
					
					<!-- 内容区域 -->
					<div class="absolute inset-0 pt-16">
						<!-- 默认提示界面 -->
						<div v-if="!hasUserInput" class="w-full h-full flex items-center justify-center">
							<div class="text-center p-8">
								<div class="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
									<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
									</svg>
								</div>
								<h3 class="text-xl font-medium text-gray-900 mb-2">欢迎使用智能控制面板</h3>
								<p class="text-gray-500 mb-4">请在左侧输入您的控制需求<br/>例如："我要控制客厅的灯"</p>
								<div class="space-y-2 text-sm text-gray-400">
									<p>支持的功能：</p>
									<p>✓ 灯光控制（开关、亮度）</p>
									<p>✓ 空调控制（温度、模式）</p>
									<p>✓ 窗帘控制（开合）</p>
									<p>✓ 更多设备支持中...</p>
								</div>
							</div>
						</div>
						<!-- 实际控制界面 -->
						<div v-else class="w-full h-full relative scale-container">
							<div ref="result" class="absolute inset-0" v-html="suchIframe"></div>
						</div>
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
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.3s ease-in-out;
}

.shadow-lg:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
    background-color: #ffffff;
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
}

/* 输入框样式优化 */
input {
    height: 42px;
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
    transform: translateY(-1px);
    transition: all 0.2s ease;
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
</style>