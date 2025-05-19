import { css } from "jquery";
import { Input, stringify } from "postcss";
import { Ref } from "vue";
import raceAsync from "./asyncRace";
import State_data_instance from "../js/state_data_instance";
import Sense from "../js/json_interface";
const task2Fast = `### 分析需求
用户的需求是构建一个用于控制所有灯光的面板。根据提供的信息，卧室中有以下与灯光相关的家具及其状态：
1. **吊灯** (Chandelier)
   - **chandelier_power_bedroom**: 开启或关闭吊灯 (Type: bool)
   - **chandelier_brightness_bedroom**: 调节吊灯亮度 (Type: int)
2. **床头灯** (Bedside Lamp)
   - **bedside_lamp_power_bedroom**: 开启或关闭床头灯 (Type: bool)
   - **bedside_lamp_brightness_bedroom**: 调节床头灯亮度 (Type: int)
3. **电视** (TV)
   - **tv_power_bedroom**: 开启或关闭电视 (Type: bool)
   - **tv_brightness_bedroom**: 调节电视亮度 (Type: int)
虽然电视和音响也涉及到亮度和音量控制，但用户明确要求的是“灯光”控制面板，因此我们只考虑与灯光直接相关的设备，即吊灯和床头灯。
### 设计方
我们将构建一个简单的面板，包含以下功能：
- 开关控制：用于开启或关闭吊灯和床头灯。
- 亮度调节：通过滑块调节吊灯和床头灯的亮度。
### 代码实现
css
{cssBegin}
.light-control-panel {
    @apply bg-white p-6 rounded-lg shadow-lg;
}
.light-control-header {
    @apply text-xl font-bold mb-4;
}
.light-control-item {
    @apply mb-4;
}
.light-control-label {
    @apply text-gray-700 font-medium mb-2;
}
{cssEnd}
{htmlBegin}
<div name="AIHtmlRoot" class="light-control-panel">
    <div class="light-control-header">灯光控制</div>
    
    <div class="light-control-item">
        <div class="light-control-label">吊灯</div>
        <div class="flex items-center space-x-4">
            <BoolButton dataApiName="chandelier_power_bedroom" class="bg-blue-500 text-white px-4 py-2 rounded" ></BoolButton>
            <IntSlider dataApiName="chandelier_brightness_bedroom" class="w-full"></IntSlider>
        </div>
    </div>
    
    <div class="light-control-item">
        <div class="light-control-label">床头灯</div>
        <div class="flex items-center space-x-4">
            <BoolButton dataApiName="bedside_lamp_power_bedroom" class="bg-blue-500 text-white px-4 py-2 rounded" ></BoolButton>
            <IntSlider dataApiName="bedside_lamp_brightness_bedroom" class="w-full" ></IntSlider>
        </div>
    </div>
</div>
{htmlEnd}
{jsBegin}

let a=1;

{jsEnd}
### 解释
1. **CSS部分**:
2. **HTML部分**:
3. **JS部分**:
### 总结
这个代码片段构建了一个简洁、直观的灯光控制面板，用户可以轻松地控制卧室中的吊灯和床头灯的开关及亮度。通过TailwindCSS和Vue.js的结合，代码具有良好的可维护性和扩展性。`;
const task1Fast = `
<jsonBegin>
{
    "result": [
        {
            "room_name": "卧室",
            "furniture": ["电动窗帘", "空调", "吊灯", "加湿器", "床头灯", "电视", "音响"]
        },
        {
            "next": "界面基本结构:界面应包含一个房间控制面板,面板上分为多个功能区域,每个功能区域对应一个家具.每个家具的控制组件应包含该家具的基本属性控制选项,如开关/亮度/温度等,具体取决于家具类型。"
        }
    ]
}
<jsonEnd>
`;
// Extend the Window interface to include theAiHtml
declare global {
    interface Window {
        theAiHtml: string;
        theAiCss: string;
        theAiJs: string;
    }
}

export default class ComponentBuilder {
    public static componentBuilderInstance:ComponentBuilder = new ComponentBuilder();
    private static api_key: string = "sk-gbsbijkrwksshaxzsxlwlrqvxubxvxksucwseyyiwnzpebpw"; // 请替换为真实API密钥
    private static api_url: string = "https://api.siliconflow.cn/v1";
    private static thModel = "deepseek-ai/DeepSeek-V3";


    private userRequire: string = "null";
    private require_detail:string="null";



    private styleFlags: Map<string,((Input:string)=>void)[]> = new Map();
    async fastTest(n){
        switch(n){
            case 1:
                return task1Fast;
            case 2:
                return task2Fast;
       }


    }

    async callApi(promote: string, apiKey: string = ComponentBuilder.api_key, apiUrl: string = ComponentBuilder.api_url, model: string = ComponentBuilder.thModel): Promise<string | null> {
        try {
            const response = await fetch(`${apiUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: "user", content: promote }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(apiUrl+" done\nresponse: "+data.choices[0].message.content);

            return data.choices[0].message.content;
        } catch (error) {
            console.error('API调用失败:', error);
            return null;
        }
    }

    async call_api_multiple(promote,atFirstDone,atAllDone){
        const api=[{
                url:"https://api.siliconflow.cn/v1",
                model:"deepseek-ai/DeepSeek-V3",
                key:"sk-gbsbijkrwksshaxzsxlwlrqvxubxvxksucwseyyiwnzpebpw"
            },
            {
                url:"https://api.deepseek.com",
                model:"deepseek-chat",
                key:"sk-ec5d4fc773df49ef8dabfcaedecccd2c"
            }
        ];
        const call = async (index) => {
            return this.callApi(promote, api[index].key, api[index].url, api[index].model);
        };

        raceAsync(
            call,
            [1],
            atFirstDone,
            1,
        ).then((result)=>{atAllDone(result)});
        
    }

    async callApi_more(context : {role: string;content: string;}[]): Promise<string | null> {
        try {
            const response = await fetch(`${ComponentBuilder.api_url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ComponentBuilder.api_key}`
                },
                body: JSON.stringify({
                    model: ComponentBuilder.thModel,
                    messages: context
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API调用失败:', error);
            return null;
        }
    }
    whatToDo(){
        this.callApi_more([{role:"system",content:"当前是智能家居管理软件,目的是通过ai和已有组件构建动态化的用户界面,实现对用户住所的接入网络的家居进行控制,所有的家居网络接口都已被抽象为 唯一标识符 ,在此阶段,你只需要根据用户的原始需求输入,分析出当前页面实际要拥有的功能,例如用户说自己对家中的家居耗电不确定,你应该分析出这页面应该是获取用户家中所有家居的耗电量,然后整合汇总,进行展示,明白吗?"},
                {role:"assistant",content:"明白"},
                {role:"system",content:"用户提出如下需求:\"  我要一个控制所有房间灯泡的界面\""},
                {role:"assistant",content:"用户提出:我要一个控制所有房间灯泡的界面。这意味着当前页面需要集成所有房间的灯泡控制接口，并提供以下功能：\n\n1. **灯泡列表**：显示家中每个房间的灯泡状态（开/关）。\n2. **开关控制**：提供开关按钮，允许用户直接控制每个灯泡的开关状态。\n3. **调光功能**：如果灯泡支持调光，提供滑块或选择器来调整亮度。\n4. **统一控制**：提供“全开”和“全关”按钮，可同时控制所有灯泡。\n5. **状态反馈**：实时展示每个灯泡的当前状态（开/关）。\n\n这样可以方便用户在一个界面内高效地控制家中所有房间的灯光。"},
                {role:"system",content:"好的,用户提出新的需求:\"我想知道家里的用电情况 \""},                      
            ]).then(response=> console.log(response));
    }
    toTaskTree(){

    }
    toHtml(){
        
    }
    setStyleFlag(name:string,callBack:(Input:string)=>void){
        if(this.styleFlags.has(name)){
            this.styleFlags.get(name).push(callBack);
        }
        else this.styleFlags.set(name,[callBack]);
    }

    setDependency_source(callBack:(input:JSON)=>JSON,describe:JSON){

    }
    setDependency_target(callBack:(input:((input:JSON)=>JSON))=>void,describe:JSON){

    }
    connectDependencies(){

    }
    buildStyleFlags(){

    }
    setUserRequire(requirement: string): void {
        this.userRequire = requirement;
    }
    NO_startBuild(userNeeds) {
        const JSONBegin = "<jsonBegin>";
        const JSONEnd = "<jsonEnd>";
        const htmlBegin = "{htmlBegin}";
        const htmlEnd = "{htmlEnd}";
        const cssBegin = "{cssBegin}";
        const cssEnd = "{cssEnd}";
        const jsBegin = "{jsBegin}";
        const jsEnd = "{jsEnd}";
        const userRequire = "{userRequire}";

        const state_data_instance = State_data_instance.stateInstancePack;
        const sense = state_data_instance.getSense();

        const task1Promote = `
            在智能家具管理界面自动构建场景下,系统需要根据用户对家居进行管理的需求构建出合理的页面,在当前步骤,你需要挑选出用户需求实际涉及到的家居,用户有如下需求:"${userRequire}",考虑以下哪些家居是完成这个需求所需要的,然后列出这些家居,请以
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
            ${JSONEnd}的格式回复,其中json数据必须包裹在${JSONBegin} ${JSONEnd}结构中,以下是家居列表 :
        `;

        const task2Promote = `
            你需要使用html和原生css,原生js,完成一个网页片段的构建,你生成的代码将会整合进一个现有网页
            作为页面的一部分,此代码片段服务于智能家具管理场景,在智能家具管理界面自动构建场景下,用户有如下需求:"${userRequire}"
            经过分析,以下是你可以使用的信息:
        `;
        let task2PromoteAdd = "";
        const task1PromoteAdd2 = `
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
        `;
        let finalResult: { task1Result: string; task2Result: string; html: string; css: string; js: string } = { 
            task1Result: "", 
            task2Result: "", 
            html: "", 
            css: "", 
            js: "" 
        };

        const task1 = async () => {
            let promote1 = task1Promote + state_data_instance.getSense().house.getFurnitureDescribeInEveryRoom();
            promote1 = promote1.replace(userRequire, userNeeds);

            console.log(promote1);
            await this.callApi(promote1).then((response) => {
                const jsonStartIndex = response.indexOf(JSONBegin) + JSONBegin.length;
                const jsonEndIndex = response.indexOf(JSONEnd);
                const jsonString = response.substring(jsonStartIndex, jsonEndIndex);
                const jsonResponse = JSON.parse(jsonString);
                try {

                    finalResult.task1Result = response;

                    task2PromoteAdd = "";
                    jsonResponse.result.forEach((r) => {
                        if (r.furniture) {
                            task2PromoteAdd += ("\n在" + r.room_name + "房间,有以下家具\n");

                            r.furniture.forEach((f) => {
                                const furnitureString = Sense.furnitureToString(sense.find({ r: r.room_name, f: f }));
                                if (furnitureString !== undefined) {
                                    task2PromoteAdd += furnitureString + "\n";
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
        };

        const task2 = async () => {
            let promote2 = task2Promote + task2PromoteAdd + task1PromoteAdd2;
            promote2 = promote2.replace(userRequire, userNeeds);
            console.log(promote2);

            await this.call_api_multiple(promote2, (result) => {
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
                finalResult.task2Result = v;
                finalResult.html = html;
                finalResult.css=css;
                finalResult.js =js;
                console.log(result);
            }, console.log);
        };

        return async () => {
            await task1();
            await task2();
        };
    }
}