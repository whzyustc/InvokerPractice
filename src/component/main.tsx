import React from 'react'
import Header from './header';
import {targetInfo} from './area';
import Area from './area';

export interface IMainProps{
    name?:string;
}


export interface IMainState{
    qius:string[];
    jinengs:string[];
    currentjineng:string;
    targetArr:Map<string,targetInfo>;
}


var skills:string[][][]=[[[],[],[],[]],[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]];
skills[1][1][1]='b';
skills[3][0][0]='y';
skills[0][3][0]='c';
skills[0][0][3]='t';
skills[2][1][0]='v';
skills[2][0][1]='g';
skills[1][2][0]='x';
skills[0][2][1]='z';
skills[1][0][2]='f';
skills[0][1][2]='d';

const randomSkill:string[]=['t','y','d','f','g','z','x','c','v','b']

enum asciicode {
    q=81,
    w=87,
    e=69,
    r=82,

    t=84,
    y=89,
    f=70,
    d=68,
    z=90,
    x=88,
    c=67,
    v=86,
    b=66,
    g=71,
    esc=27
    
}

var invokelist:any={
    'q':0,
    'w':1,
    'e':2
}

var skillType:any={
    'q':'element',
    'w':'element',
    'e':'element',
    'r':'invoke',
    't':'target',
    'y':'target',
    'd':'target',
    'f':'spell',
    'g':'spell',
    'z':'target',
    'x':'target',
    'c':'target',
    'v':'spell',
    'b':'target'
}



export default class MainCom extends React.Component<IMainProps,IMainState>{
    public state:Readonly<IMainState>={
        qius:[],
        jinengs:['',''],
        currentjineng:'',
        targetArr:new Map()
    }
    targetTimeout: any;
    insertInterval: any;

    constructor(props:IMainProps){
        super(props);
        this.targetTimeout={};
    }

    onKeyDown=(e:KeyboardEvent)=>{
        console.log(e.keyCode);
        
        switch(e.keyCode){
            case asciicode["q"]:
                this.addQiu('q');
                break;
            case asciicode["w"]:
                this.addQiu('w');
                break;
            case asciicode['e']:
                this.addQiu('e');
                break;
            case asciicode['r']:
                this.invoke();
            case asciicode['esc']:
                this.cancel();
            default:
                if (asciicode[e.keyCode])
                this.addcurrent(asciicode[e.keyCode]);
                break;
        }

    }


    addTarget(){
        let i:number;

        let targetTmp:string;

        do{

        i=Math.floor((Math.random()*10));

        targetTmp=randomSkill[i];

        }while (this.state.targetArr.has(targetTmp))

        let x=Math.floor((Math.random()*400)+1);
        let y=Math.floor((Math.random()*400)+1);


        console.log(i,targetTmp);

        //console.log(this.state.qius);
        let tmp=this.state.targetArr;
        tmp.set(targetTmp,{
            skillname:targetTmp,
            position_x:x,
            position_y:y,
            status:'waiting'
        });


        this.targetTimeout[targetTmp]=setTimeout(this.deleteTarget.bind(this),12000,targetTmp);

        this.setState({targetArr:tmp});



    }

    deleteTarget(skillname:string){
        let tmp=this.state.targetArr;
        tmp.delete(skillname);

        this.setState({targetArr:tmp})

    }

    componentDidMount(){
        document.addEventListener("keyup",this.onKeyDown);
        this.insertInterval=setInterval(this.addTarget.bind(this),3000);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown",this.onKeyDown);
        clearInterval(this.insertInterval);
    }

    cancel(){
        if (this.state.currentjineng!='')this.setState({currentjineng:''});
    }

    addcurrent(jineng:string){
        if (this.state.jinengs.indexOf(jineng)>=0)
        {
            if (skillType[jineng]=='spell')
            {

            let tmp=this.state.targetArr;
            let obj=tmp.get(jineng);
            if (obj)
            {
                if (obj.status=='wrong')return;
                obj.status='clear';
                tmp.set(jineng,obj);
                this.setState({targetArr:tmp})

                this.targetTimeout[jineng]=setTimeout(this.deleteTarget.bind(this),1000,jineng);
            }

            }
            else this.setState({currentjineng:jineng});
        }
    }

    invoke(){
        let tmp:number[]=[0,0,0];
        if (this.state.qius.length!=3)return;
        for (let i=0;i<3;i++)
        {
            tmp[invokelist[this.state.qius[i]]]++;
        }
        this.addJineng(skills[tmp[0]][tmp[1]][tmp[2]])
        console.log(tmp);
    }

    addJineng(jineng:string)
    {
        let tmp = this.state.jinengs;

        switch(this.state.jinengs.indexOf(jineng)){
            
            case 1:
                break;
            case 0:
            default:
                tmp.push (jineng) ;
                break;

        }
        
        if (tmp.length>2)
        {
            tmp.shift();
        }
        this.setState({jinengs:tmp});
    
    }

    addQiu(qiu:string)
    {
        if(qiu=='q'||qiu=='w'||qiu=='e')
        {
            
        let tmp = this.state.qius;
        tmp.push (qiu) ;
        if (tmp.length>3)
        {
            tmp.shift();
        }
        this.setState({qius:tmp});
        }
    }

    handleClick(e:any){
        //console.log(typeof(e.target));
        
        let k=e.target.innerText
        if (k==this.state.currentjineng)
        {
            let tmp=this.state.targetArr;
            let obj=tmp.get(k);
            if (obj)
            {
                if (obj.status=='wrong')return;
                obj.status='clear';
                tmp.set(k,obj);
                this.setState({targetArr:tmp})

                this.targetTimeout.push(setTimeout(this.deleteTarget.bind(this),1000,k));
            }
        }
        else {
            
            let tmp=this.state.targetArr;
            let obj=tmp.get(k);
            if (obj)
            {
                if (obj.status=='wrong')return;
                obj.status='wrong';
                tmp.set(k,obj);
                this.setState({targetArr:tmp})

                this.targetTimeout.push(setTimeout(this.deleteTarget.bind(this),1000,k));
            }
        }

        //console.log(target);
    }

    render(){
        return (
            <>
            <Header qius={this.state.qius} jinengs={this.state.jinengs} current={this.state.currentjineng}/>
            <Area target={this.state.targetArr} clickFunction={this.handleClick.bind(this)}/>

            {/* <h1>{JSON.stringify(this.state)}</h1> */}
            </>
        );
    }
}

