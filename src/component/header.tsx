import React from   'react'
import './header.css'

var skilllists:any={
    'q':{url:'./images/Quas_icon.png',skilltype:'element'},
    'w':{url:'./images/Wex_icon.png',skilltype:'element'},
    'e':{url:'./images/Exort_icon.png',skilltype:'element'},
    'r':{url:'./images/Invoke_icon.png',skilltype:'invoke'},
    't':{url:'./images/Sun_Strike_icon.png',skilltype:'target'},
    'y':{url:'./images/Cold_Snap_icon.png',skilltype:'target'},
    'd':{url:'./images/Chaos_Meteor_icon.png',skilltype:'target'},
    'f':{url:'./images/Forge_Spirit_icon.png',skilltype:'spell'},
    'g':{url:'./images/Ice_Wall_icon.png',skilltype:'spell'},
    'z':{url:'./images/Alacrity_icon.png',skilltype:'target'},
    'x':{url:'./images/Tornado_icon.png',skilltype:'target'},
    'c':{url:'./images/EMP_icon.png',skilltype:'target'},
    'v':{url:'./images/Ghost_Walk_icon.png',skilltype:'spell'},
    'b':{url:'./images/Deafening_Blast_icon.png',skilltype:'target'}
}

interface IHeaderProps{
    qius:string[],
    jinengs:string[],
    current:string;
}

export default class Header extends React.Component<IHeaderProps>{
    
    render(){
        //console.log(this.props.qius.map((item,index)=>item));
        return (
            <div className="header">
                {this.props.qius.map((item,index)=><QiuImage imagename={item} key={index}/>)}
                {this.props.jinengs.map((item,index)=><SkillImage imagename={item} key={1-index}  / >)}
                {<SkillImage imagename={this.props.current}/>}
            </div>
        )
    }
}

interface IImageProps{
    imagename:string;
}


export class QiuImage extends React.Component<IImageProps>{
    render(){
        return (
            <div className={`${this.props.imagename} imageBox`} >{this.props.imagename}</div>
        )
    }

}
export class SkillImage extends React.Component<IImageProps>{
    render(){
        return (
            <div className={`${this.props.imagename} skillimageBox`} >{this.props.imagename}</div>
        )
    }

}