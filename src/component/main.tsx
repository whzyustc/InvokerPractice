import React from 'react'
import Header from './header';

export interface IMainProps{
    name?:string;
}

export interface IMainState{
    qius:string[];
    jinengs:string[];
    currentjineng:string;
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

export default class MainCom extends React.Component<IMainProps,IMainState>{
    public state:Readonly<IMainState>={
        qius:[],
        jinengs:['',''],
        currentjineng:''
    }

    constructor(props:IMainProps){
        super(props);
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

    componentDidMount(){
        document.addEventListener("keyup",this.onKeyDown);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown",this.onKeyDown);
    }

    cancel(){
        if (this.state.currentjineng!='')this.setState({currentjineng:''});
    }

    addcurrent(jineng:string){
        this.setState({currentjineng:jineng});
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

    render(){
        return (
            <>
            <Header qius={this.state.qius} jinengs={this.state.jinengs} current={this.state.currentjineng}/>
            <div className='huabu'>huabu</div>
            {/* <h1>{JSON.stringify(this.state)}</h1> */}
            </>
        );
    }
}

