function load(){
	event_init()
	gameover=true
}

let log_txt=""
let event_pool_basic=[]
let event_pool=[]
let buff={}
let flag={}
let gameover=false
let op={}
let chapter=0
let chapter_startweek=0
let prostitute_week=0
const name={
	name:"职业",
	lv:"等级",
	exp:"经验",
	will:"意志",
	str:"力量",
	dex:"敏捷",
	wis:"智力",
	money:"金钱",
	pay:"支出",
	lewd:"淫乱",
	lust:"欲望",
	adv:"冒险者等级",
	v_virgin:"初体验",
	v_exp:"被生活强奸的经验",
	b_exp:"应付甲方经验",
	e_exp:"加班经验",
	v_lv:"被生活开发",
	b_lv:"甲方开发",
	m_exp:"中医经验",
	m_lv:"中医狂热",
	e_lv:"加班癖",
	u_lv:"玄学开发",
	u_exp:"玄学经验",
	p_lv:"受虐狂",
	p_exp:"受虐经验",
	s_exp:"思想教育经验",
	s_lv:"小粉红",
	orgasm:"高潮经验",
}

let myclass={
	name:"膜哥哥",
	str:10,
	dex:6,
	wis:6,
	str_gain:2,
	dex_gain:1,
	wis_gain:1,
	money:200,
	pay:100,
	trait:"无惧迫害"
}

const class_list=[{
	name:"膜哥哥",
	str:10,
	dex:6,
	wis:6,
	str_gain:2,
	dex_gain:1,
	wis_gain:1,
	money:200,
	pay:100,
	trait:"无惧迫害"
},{
	name:"魔法师",
	str:6,
	dex:6,
	wis:10,
	str_gain:1,
	dex_gain:1,
	wis_gain:2,
	money:200,
	pay:100,
	trait:"钢之魂"
},{
	name:"路易114514",
	str:8,
	dex:8,
	wis:8,
	str_gain:1,
	dex_gain:2,
	wis_gain:1,
	money:200,
	pay:100,
	trait:"断头台"
}
]

const status_normal=["name","lv","exp","str","dex","wis","money","pay"]
const status_sex=["lewd","lust","v_virgin","orgasm","v_lv","v_exp","b_lv","b_exp","e_lv","e_exp","s_lv","s_exp","p_lv","p_exp","m_lv","m_exp","u_lv","u_exp"]
let basic_status={
		name:"膜王",
		lv:1,
		exp:0,
		str:5,
		dex:3,
		wis:2,
		money:100,
		pay:50,
		lewd:0,
		lust:0,
		adv:"E",
		explore:0,
		e_exp:0,
		v_exp:0,
		b_exp:0,
		u_exp:0,
		orgasm:0,
		v_virgin:"",
		main:"str",
		v_lv:0,
		b_lv:0,
		e_lv:0,
		u_lv:0,
		m_exp:0,
		m_lv:0,
		p_exp:0,
		p_lv:0,
		s_lv:0,
		s_exp:0
	}
let status={}
function refresh(){
	month_org_cnt=0
	month=1
	display=[]
	display_txt=""
	past_event=[]
	week=1
	town=true
	monthend=false
	for(i in ev){
		event_pool_basic.push(i)
		if(ev[i].start==null)ev[i].start=0
		if(ev[i].end==null)ev[i].end=10000000
		if(ev[i].once==null)ev[i].once=false
	}
	for(i in basic_status)
		status[i]=basic_status[i]
	myclass=class_list[rand(3)]
	event_pool=event_pool_basic
	for(i in myclass){
		if(i in status)
		status[i]=myclass[i]
	}
	buff={}
	flag={}
	op={}
	chapter=1
	chapter_startweek=0
	prostitute_week=0
	gameover=false
	log_txt=""
}
let month_org_cnt=0
let month=1
let display=[]
let display_txt=""
let gamestate="stop"
function show(str,newline){
	if(newline==false){
		display_txt+=str+" "
		return
	}
	display_txt+=str+"<br>"
	if(newline==true){
		display.push(display_txt)
		display_txt=""
	}
}

function pause(){
	display.push(display_txt)
	display_txt=""
}

function mainLoop(){

	if(display.length>0||display_txt!=""){
		if(display_txt!=""){
			display.push(display_txt)
			display_txt=""
		}
		log_txt+=display.shift()
		document.getElementById("gamelog").innerHTML=log_txt
		if(display.length==0 || (!town && week==1)){
			log_txt+="<br>"
			document.getElementById("gamelog").innerHTML=log_txt
			att_str=""
			if(chapter==6)att_str="冒险者等级 S "
			else att_str="冒险者等级 "+String.fromCharCode(70-chapter)+" "
			for(i in status_normal){
				ii=status_normal[i]
				att_str+=name[ii]+" "+status[ii]+"   "
			}
			document.getElementById("attribute").innerHTML=att_str
			att_str=""
			for(i in status_sex){
				ii=status_sex[i]
				if(status[ii]!=0 && status[ii]!="")att_str+=name[ii]+" "+status[ii]+"<br>"
				if(status[ii]==="")att_str+=name[ii]+" 无<br>"
			}
			att_str+="<br>"
			for(i in buff){
				if(buff[i]==0)att_str+=i+"<br>"
				else att_str+=i+" "+buff[i]+"<br>"
			}
			att_str+="<br>"
			for(i in op){
				if(op[i].val>=0)att_str+=i+"好感度 "+op[i].val+"<br>"
			}
			document.getElementById("status").innerHTML=att_str
		}
		var myDiv = document.getElementById("bottom-right");
		myDiv.scrollTop = myDiv.scrollHeight;
		return
	}
	if(gamestate=="step2"){
		if(my_int!=null)clearInterval(my_int)
		gamestate="stop"
		return
	}else if(gamestate=="step"){
		gamestate="step2"
	}
	if(gameover==true){
		if(my_int!=null)clearInterval(my_int)
		gamestate="stop"
		return
	}

	if(monthend==true){
		show("月底")
		if(status.money<0){
			show("你的欠款增加了。")
			gain({money:Math.floor((status.money-9)/5)})
			gainbuff("负债",1)
		}else if("负债"in buff){
			show("你的欠款还清了。")
			gainbuff("负债",-10000)
		}
		if(isPrisoner()){
			show("你意识到监禁生活的优点是不需要支付房费。")
		}else{
			if("露宿街头"in buff){
				if(status.money>=status.pay){
					show("由于你有了足够的积蓄，你结束了街头生活。")
					gain({money:-status.pay})
					gainbuff("露宿街头",-10000)
				}else{
					/*show("由于露宿街头的效果，你时不时会在睡梦中遭到侵犯。")
					gain({v_exp:8,a_exp:4,b_exp:2,e_exp:2,s_exp:4},"路人")
					if("纹身：娼妇"in buff){
						show("由于娼妇纹身的效果，侵犯你的人偶尔会留下一点小钱。")
						gain({money:5})
					}*/
					show("你觉得桥洞底下盖小被的生活或许也不错。")
				}
			}else{
				show("你支付了旅馆的房费。")
				gain({money:-status.pay})
			}
		}
		/*if("触手服" in buff){
			show("由于触手服的效果，你的身体时刻被爱抚着。")
			gain({v_exp:8,a_exp:4,b_exp:6,u_exp:2,p_exp:2})
		}
		var target=Math.floor(status.lewd/4+rand(status.lewd/3))
		if(month_org_cnt<target){
			show("这个月你高潮了"+month_org_cnt+"次，你的身体没有得到满足")
			gain({lust:target-month_org_cnt})
		}else if(month_org_cnt>0){
			show("这个月你高潮了"+month_org_cnt+"次")
		}*/
		att_str=""
		att_str+="章节 "+chapter+" "
		for(i in status_normal){
			ii=status_normal[i]
			att_str+=name[ii]+" "+status[ii]+"   "
		}
		//show(att_str)
		month_org_cnt=0
		month++
		monthend=false
		week++
		mainLoop()
		town=true

		return
	}else{
		if(town)
			//show("第"+week+"周 城镇事件")
			show("第"+week+"周 工作事件")
		else
			show("第"+week+"周 冒险事件")

		goblin_pow=month+12
		slime_pow=month+14
		orc_pow=month+16
		tentacle_pow=month+18
		succubus_pow=month+20
		var chance=[]
		var t=0
		for(i in event_pool){
//			try{
				if(ev[event_pool[i]].town==town && ev[event_pool[i]].start<=chapter && ev[event_pool[i]].end>=chapter && (ev[event_pool[i]].once!=true || !(past_event.includes(event_pool[i])))){
					tt=ev[event_pool[i]].chance()
					if(tt!=null)t+=tt
				}
//			}
//			catch(err){
	//			console.log(event_pool[i])
		//		console.log(err.message)
			//}
			chance[i]=t
		}
		t*=Math.random()
		var i=0
		while(t>chance[i] && chance[i]<10000){
			i++;
		}
		ev[event_pool[i]].ev()
		if(!past_event.includes(event_pool[i]))
			past_event.push(event_pool[i]);

		if(week%4==0 && monthend==false && !town) monthend=true
		else {
			if(town)town=false
			else{
				week++
				monthend=false
				town=true
			}
		}
		mainLoop()
		return
	}
}
function isPrisoner(){
	return buff["监禁：小程序"]!=null || buff["监禁：相信星座的兽人"]!=null
}
function gainop(person){
	if(op[person]==null){
		op[person]={
			val:0,
			st:"",
			prison:0
		}
		show("你认识了"+person)
	}else{
		op[person].val+=1
		show(person+"的好感度提升了")
	}
}

function gainbuff(newbuff,val){
	if(val==null && buff.newbuff==null){
		buff[newbuff]=0
		show("获得状态 "+newbuff)
	}
	else if(val<0){
		buff[newbuff]+=val
		if(buff[newbuff]<=0){
			delete(buff[newbuff])
			show("状态解除 "+newbuff)
		}else{
			show("状态减轻 "+newbuff+" "+val)
		}
	}else{
	
		if(buff[newbuff]==null){
			buff[newbuff]=val
			show("获得状态 "+newbuff+" "+val)
		}else {
			buff[newbuff]+=val	
			show("状态强化 "+newbuff+" "+val)
		}
	}
}


function gainflag(newbuff,val){
	if(val==null && flag.newbuff==null){
		flag[newbuff]=0
	}
	else if(val<0){
		flag[newbuff]+=val
		if(flag[newbuff]<=0){
			delete(flag[newbuff])
		}
	}else{
		if(flag[newbuff]==null){
			flag[newbuff]=val
		}else {
			flag[newbuff]+=val	
		}
	}
}


function gain(bonus,enemy){
	var tmp=""
	var org_cnt=0
	if("v_exp" in bonus){
		for(let i=0;i<bonus["v_exp"];i++)
			org_cnt+=Math.floor((status.v_lv*0.1+1.3)*Math.random())
	}
	var c0=0
	if("b_exp" in bonus){
		c0=org_cnt
		for(let i=0;i<bonus["b_exp"];i++)
			org_cnt+=Math.floor((status.b_lv*0.1+1.2)*Math.random())
		c0=org_cnt
	}
	if("e_exp" in bonus){
		for(let i=0;i<bonus["e_exp"];i++)
			org_cnt+=Math.floor((status.e_lv*0.1+1.1)*Math.random())
	}
	if("u_exp" in bonus){
		for(let i=0;i<bonus["u_exp"];i++)
			org_cnt+=Math.floor((status.e_lv*0.1+1.0)*Math.random())
	}
	if("s_exp" in bonus){
		for(let i=0;i<bonus["s_exp"];i++)
			org_cnt+=Math.floor((status.e_lv*0.1+1.0)*Math.random())
	}
	if("p_exp" in bonus){
		for(let i=0;i<bonus["p_exp"];i++)
			org_cnt+=Math.floor((status.m_lv*0.1+1.0)*Math.random())
	}
	if("m_exp" in bonus){
		for(let i=0;i<bonus["m_exp"];i++)
			org_cnt+=Math.floor((status.m_lv*0.1+1.3)*Math.random())
	}
	org_cnt=Math.floor(org_cnt)
	if(org_cnt>0){
		if(bonus["orgasm"]==null)bonus["orgasm"]=0
		bonus["orgasm"]=org_cnt+bonus["orgasm"]
	}
	if("orgasm" in bonus){
		month_org_cnt+=bonus["orgasm"]
	}
	if(enemy!=null){
		if(bonus.v_exp>1 && status.v_virgin==""){
			status.v_virgin=enemy
			show(enemy+"夺走了你的处男——当然是以被生活强奸的形式。")
			if(bonus.lewd==null)bonus.lewd=0
			bonus.lewd++
			if("钢之魂" in buff){
				gainbuff("钢之魂",-10000)
				gainbuff("钢之魂（已失效）")
				gain({str:-3,dex:-3,wis:-3})
			}
		}
		/*if(bonus.o_exp>1 && status.o_virgin==""){
			status.o_virgin=enemy
			show(enemy+"夺走了你的初吻")
			if(bonus.lewd==null)bonus.lewd=0
			bonus.lewd++
		}
		if(bonus.a_exp>1 && status.a_virgin==""){
			status.a_virgin=enemy
			show(enemy+"夺走了你的后庭处女")
			if(bonus.lewd==null)bonus.lewd=0
			bonus.lewd++
		}*/
	}

	for(s in name){
		if(s in bonus){
			status[s]+=bonus[s]
			if(Number.isInteger(bonus[s])&&bonus[s]>0){
				tmp+=name[s]+"+"+bonus[s]+"  "
			}else if(bonus[s]<0){
				tmp+=name[s]+bonus[s]+"  "
			}
		}
	}

	show(tmp)
	/*if(c0>0 && "母乳体质"in buff){
		show("由于母乳体质的效果，你产出了乳汁\n胸部经验+1")
		status.b_exp++
	}
	if(org_cnt>rand(10) && "漏尿体质"in buff){
		show("由于漏尿体质的效果，你在高潮时漏尿了\n尿道经验+1")
		status.u_exp++
	}*/
	if(status.exp>=10*status.lv*status.lv){
		show("等级提升",false)
		var u=Math.floor(Math.sqrt(status.exp/10)+1)-status.lv
		gain({lv:u,str:myclass.str_gain*u, dex:myclass.dex_gain*u, wis:myclass.wis_gain*u})
	}
	if(status.v_exp>=10*(status.v_lv+1)){
		show("你开始喜欢被生活强奸了。",false)
		var u=Math.floor(status.v_exp/10)-status.v_lv
		gain({v_lv:u,lewd:u})
	}
	if(status.b_exp>=10*(status.b_lv+1)){
		show("你开始喜欢被甲方调教了。",false)
		var u=Math.floor(status.b_exp/10)-status.b_lv
		gain({b_lv:u,lewd:u})
	}
	if(status.e_exp>=10*(status.e_lv+1)){
		show("你对加班产生了兴趣",false)
		var u=Math.floor(status.e_exp/10)-status.e_lv
		gain({e_lv:u,lewd:u})
	}
/*	if(status.orgasm>=10*(status.org_lv+1)*(status.org_lv+1)){
		show("你的身体渴求更多的高潮")
		var u=Math.floor(Math.sqrt(status.orgasm/10))-status.org_lv
		gain({org_lv:u,lewd:u})
	}*/
	if(status.s_exp>=10*(status.s_lv+1)){
		show("你开始变成小粉红了。",false)
		var u=Math.floor(status.s_exp/10)-status.s_lv
		gain({s_lv:u,lewd:u})
	}
	if(status.m_exp>=10*(status.m_lv+1)){
		show("你的中医技巧愈发娴熟",false)
		var u=Math.floor(status.m_exp/10)-status.m_lv
		gain({m_lv:u,lewd:u})
	}
	if(status.u_exp>=10*(status.u_lv+1)){
		show("你可以在星座测试时获得快感了",false)
		var u=Math.floor(status.u_exp/10)-status.u_lv
		gain({u_lv:u,lewd:u})
	}
	if(status.p_exp>=10*(status.p_lv+1)){
		show("你可以在受虐时获得快感了",false)
		var u=Math.floor(status.p_exp/10)-status.p_lv
		gain({p_lv:u,lewd:u})
		if("无惧迫害" in buff){
			show("由于无惧迫害的效果，你的力量提升了",false)
			gain({str:1})
		}
	}
	if("orgasm"in bonus)
		status.lust-=bonus["orgasm"]
	if(status.lust<0)status.lust=0
}

function check(att,val,dice)
{
	if(dice==null)dice=20
	x=Math.floor(Math.random()*dice)
	if(x==0 && dice==20) x=-1000
	if(x==19 && dice==20) x=1000
	//console.log(att+" "+val+" "+x)
	if(att in status)
		return Math.floor(x+status[att]-val)
	else if(att="max"){
		var a=status.str
		if(status.dex>a)a=status.dex
		if(status.wis>a)a=status.wis
		return Math.floor(x+a-val)
	}else if(att="min"){
		var a=status.str
		if(status.dex<a)a=status.dex
		if(status.wis<a)a=status.wis
		return Math.floor(x+a-val)
	}
}

function rand(n){
	return Math.floor(Math.random()*n)
}