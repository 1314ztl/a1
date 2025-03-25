<template>
	<div class="flex h-screen w-screen overflow-hidden">
		<!-- 左侧聊天区域 -->
		<div class="w-1/4 flex flex-col bg-white border-r border-gray-200">
			<div class="bg-blue-600 text-white p-4">
				<h2 class="text-xl font-bold">AI 智能助手</h2>
			</div>
			
			<div class="flex gap-2 p-4">
				<button @click="handleTask1" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">任务1</button>
				<button @click="handleTask2" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">任务2</button>
				<button @click="handleTask12" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">任务1+2</button>
			</div>
			
			<div class="flex-1 overflow-y-auto p-4" id="chatMessages">
				<div class="mb-4 p-3 rounded-lg bg-gray-100 text-gray-800 max-w-[80%]">
					您好！我是智能家居助手，请告诉我您需要什么帮助？
				</div>
			</div>
			
			<div class="border-t p-4">
				<div class="flex gap-2">
					<input type="text" v-model="userNeeds" 
						class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
						placeholder="请输入您的需求..." 
						@keyup.enter="handleTask12">
					<button @click="handleTask12" 
						class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
						发送
					</button>
				</div>
			</div>
		</div>

		<!-- 中间提示区域 -->
		<div class="w-1/4 flex items-center justify-center bg-gray-50 relative border-r border-gray-200">
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
		<div class="w-2/4 bg-white overflow-hidden">
			<div ref="result" class="w-full h-screen" v-html="suchIframe"></div>
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

const suchIframe = ref(`<iframe src="http://localhost:5173/userView.html" style="width: 200%; height: 150vh; border: 2px solid rgba(100, 150, 255, 0.3); border-radius: 8px; transform: scale(0.5); transform-origin: 0 0;" frameborder="0"></iframe>`);

const result = ref(null);
const userNeeds = ref("");

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
                    //
                    task2PromoteAdd.value+=("\n在"+r.room_name+"房间,有以下家具\n");

					r.furniture.forEach((f) => {
						const furnitureString = Sense.furnitureToString(sense.find({ r: r.room_name, f: f }));
						if (furnitureString !== undefined) {
                            //
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
const task2 = ref(async () => {
	let promote2 = task2Promote.value + task2PromoteAdd.value + task1PromoteAdd2.value;
	promote2=promote2.replace(userRequire,userNeeds.value);
	console.log(promote2);

	await builder.value.call_api_multiple(promote2, (result) => {
		let v  = result.value;
		
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

		suchIframe.value += " ";
		console.log(result);
	}, console.log);
});

const task12 = ref( async()=>{
	await task1.value();
	await task2.value();
});

// 包装任务处理函数
const handleTask1 = async () => {
    promptState.value = 'loading';
    await task1.value();
    promptState.value = 'done';
};

const handleTask2 = async () => {
    promptState.value = 'loading';
    await task2.value();
    promptState.value = 'done';
};

const handleTask12 = async () => {
    promptState.value = 'loading';
    await task12.value();
    promptState.value = 'done';
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

:deep(iframe) {
    display: block;
    width: 200%;
    height: 150vh;
    border: 2px solid rgba(100, 150, 255, 0.3);
    border-radius: 8px;
    transform: scale(0.5);
    transform-origin: 0 0;
}
</style>