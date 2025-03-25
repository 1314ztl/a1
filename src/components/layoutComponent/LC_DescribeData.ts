import { param } from "jquery";
import DescribeData from "../DescribeData";

export default class LC_DescribeData{
    static basicComponents=[
        {
            template_name: "head_sidebar_main_footer",
            ch_name: "头部、侧边栏、主内容区和底部",
            slots:["header,sidebar,footer,main"],
            use: "as name"
        },{
            template_name: "head_and_body",
            ch_name: "头部_主体布局",
            slots:["body","header"],
            use: "包含一个标题栏和一个主体槽"
        },
    ];
    static promote=this.getBasePromote();
        
    private static getBasePromote():string{
        let result:string="";
        result+=
            `\n这里是布局管理组件,smartContainer可以通过指定attr参数来实现各种布局\n`; 
        this.basicComponents.forEach((component,index)=>{
            result+= index.toString()+".\n"+DescribeData.componentToString(component)+"\n"

        });
        console.log(result);
        return result;
    }
    
}