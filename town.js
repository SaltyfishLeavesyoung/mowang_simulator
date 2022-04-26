function town_basic(){
	ev["girls_talk"]={
		ev:function(){
			show("你听到几个同事在小声谈论什么语言是最好的语言。")
			show("你向她们分享了你的理解。她们对你肃然起敬。")
			gain({lust:2})
		},
		town:true,
		once:true,
		chance:function(){
			if(status.lewd>=20)return 0.3
		},
		start:2
	}
	ev["exhibition"]={
		ev:function(){
			show("你在夜晚的公司里加班。")
			gain({e_exp:2})
			pause()
			if(status.e_lv>=5){
				show("你遇见了几个过路人，毫不在意地继续加班。")
				gain({e_exp:5})					
			}else{
				show("你遇见了几个过路人，连忙逃跑了。")
				gain({e_exp:3})
			}
		},
		town:true,
		once:false,
		chance:function(){
			if(status.e_lv>=3) return 0.5
		}
	}
	ev["cost"]={
		ev:function(){
			show("商队被打劫了，导致城内物价上涨。")
			show("等到商路恢复畅通后，物价却没有降回去的意思。")
			gain({pay:50})
		},
		town:true,
		once:true,
		chance:function(){
			return 0.5
		},
		start:2
	}
	ev["cost3"]={
		ev:function(){
			show("越到后期，旅馆越贵。")
			show("这可是剑与魔法世界的常识。")
			gain({pay:100})
		},
		town:true,
		once:true,
		chance:function(){
			return 0.5
		},
		start:4
	}
}

function no_pant(){
	return(check("e_lv",5,5)>=0)
}

function masturbation(n){
	ans=rand(3)
	if(ans==0 && status.a_lv>=2){
		show("你将手指伸进肛门，体会着禁忌的快感。")
		gain({a_exp:n,m_exp:n})
	}else if(ans==1){
		show("你将手指伸进阴道，刺激着内部。")
		gain({v_exp:n,m_exp:n})
		if(status.v_lv>=3){
			show("你需要更粗的东西——你决定将自己的武器当做自慰棒使用。")
			gain({v_exp:n,m_exp:n,p_exp:n},"你")
		}
	}else{
		show("你玩弄着敏感的乳头和阴蒂。")
		gain({b_exp:Math.floor(n/2),v_exp:Math.floor(n/2),m_exp:n})
	}
	status.lust=0
}