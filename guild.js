function guild(){
	ev["welcome"]={
		ev:function(){
			if(myclass.name=="膜哥哥"){
				show("你是学姐群的群主，也是大家的膜哥哥。")
				show("作为大家的膜哥哥，你经常受到迫害——但你向来是无所谓的。")
				gainbuff("无惧迫害")
			}else if(myclass.name=="魔法师"){
				show("到了30岁还是处男，似乎会变成魔法师。")
				show("作为一名魔法师，你可以用魔法提升你的能力——仅限你还是处男时。")
				gainbuff("钢之魂") 
				gain({str:3,dex:3,wis:3})
			}else if(myclass.name=="路易114514"){
				show("你是路易十六的后裔。")
				show("作为贵族血脉的继承者，你有着更高的潜力——也有着更高的消费标准。")
				gainbuff("断头台")
				gain({pay:100})
			}
//			gain({lust:10000})
			//gain({str:10,dex:10,wis:10})
			//gain({pay:500})
			pause()
			show("你的同事前辈是一个三十岁出头的高大女性，她欢迎了你的加入并提醒你要保护好自己。")
			//gainop("会长")
			gainop("同事")
			show("你的上司是一个满身伤痕的魁梧男人，你被他观察你的眼光弄得有些不自在。")
			//gainop("教官")
			gainop("上司")
			gainflag("trade",60)
		},
		town:true,
		once:true,
		chance:function(){
			return 100000
		},
		end:1
	},
	ev["guild_leader"]={
		ev:function(){
			show("你的同事召集了新人们，向你们讲述了自己做前端被javascript侵犯的亲身经历。",true)
			if(rand(2)==0){
				show("同事刚讲了几句，你就开始思考为什么0.1+0.2不等于0.3，导致你根本没听清后面说的防护措施。")
				gain({lust:1})
			}else{
				show("你认真地听着课，从同事的悲惨经历当中吸取了一些教训。")
				gain({exp:5})
			}
		},
		town:true,
		once:true,
		chance:function(){
			return 1
		},
		end:1
	},
	ev["guild_leader2"]={
		ev:function(){
			show("你上班时，碰见同事前辈在向新人讲述做前端被javascript侵犯的亲身经历。",true)
			if(rand(2)==0){
				show("你听到其他同事低声谈论着这个同事热衷于教授javascript奇怪特性的异常性癖。")
				show("你对同事这个人有了新的认识。")
				gain({lust:3})
				gainop("同事")
			}else{
				show("你对她为了教导后辈不顾个人名誉的行为肃然起敬，希望自己有一天也可以像她一样坚强。")
			}
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("guild_leader")) return 1
		},
		start:2,
		end:3
	}
	ev["guild_leader3"]={
		ev:function(){
			show("你上班时，又一次碰见同事前辈在向新人讲述被javascript侵犯的亲身经历。")
			show("你走上讲台，告诉后辈：‘虽然true==1是true，但是true===1是false’。")
			show("台下的新人和过去的你一样陷入了混乱。")
			gain({lust:5})
			gainop("同事")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("guild_leader2")&&status.v_virgin!="") return 1
		},
		start:3,
		end:4
	}
	ev["guild_leader_exhibition"]={
		ev:function(){
			show("你在夜晚的公司里主动加班。")
			gain({e_exp:2})
			pause()
			show("你遇到了和你一样主动加班的同事，场面顿时十分尴尬。")
			gain({e_exp:3})
			pause()
			show("最终，同事表示，996是福报，只有加班才能更好地实现自我。")
			show("你的注意力集中在同事下腹部的心形纹路上，没有听清她在说什么。")
			gainop("同事")
			gainbuff("同事的同好")
		},
		town:true,
		once:true,
		chance:function(){
			if(getop("同事")>=3 && status.e_lv>=3) return 0.5
		}
	}
	ev["guild_leader_drink"]={
		ev:function(){
			show("你上班时，同事正在写微信小程序。",true)
			if(status.v_lv<=2){
				if(rand(3)==1){
					show("你觉得小程序狗都不写。")
					gainop("同事")
				}
			}else{
				show("你发现，微信小程序似乎挺好的。")
				gainop("同事")
				if(rand(3)==1){
					pause()
					show("之后你帮着同事一起写小程序。")
				}
			}
		},
		town:true,
		once:false,
		chance:function(){
			if(past_event.includes("guild_leader")) return 0.3
		},
	}
	ev["guild_trainer"]={
		ev:function(){
			show("你接受了上司的教导。在指导时，他假装不小心地告诉你需求改变了。")
			gain({exp:10,b_exp:1})
			gainop("上司",1)
		},
		town:true,
		once:true,
		chance:function(){
			return 1
		}
	}
	ev["guild_trainer2"]={
		ev:function(){
			show("你接受了上司的教导。在指导时，他突然告诉你产品需求改变了，你需要重做。")
			show("随后，他声称这是在训练你应对甲方突袭的能力。")
			gain({exp:30,b_exp:2})
			gainop("上司",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("guild_trainer")&&status.lewd>=20) return 1
		}
	}
	ev["guild_trainer3"]={
		ev:function(){
			show("你接受了上司的教导。在指导时，他突然告诉你整个项目都要重做，你没有反抗。")
			gain({exp:50,b_exp:4})
			pause()
			show("教导结束后，他闯进更衣室，对你进行了应对甲方的特训。")
			gain({b_exp:3,v_exp:5},"上司")
			gainop("上司",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("guild_trainer2")&&status.lewd>=40) return 1
		}
	}
	ev["guild_trainer4"]={
		ev:function(){
			show("你作为上司的助手，在训练中向众人演示了如何应对甲方的攻击。")
			gain({exp:70,b_exp:4,v_exp:2,e_exp:5})
			pause()
			show("点到为止的演示动作并不能令你满足。")
			show("下课后，他又给你补上了五倍的工作量。")
			gain({b_exp:3,v_exp:5,s_exp:2},"上司")
			gainop("上司",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("guild_trainer3")&&status.lewd>=60) return 1
		}
	}
	ev["guild_trainer5"]={
		ev:function(){
			show("上司提出要在他的家里对你进行结对编程。")
			show("你带着半是紧张半是期待的心情去了上司的家中。")
			pause()
			show("到了他家里，你才发现没有更改需求。")
			show("你码代码码得意识模糊。")
			gain({exp:100})
			pause()
			show("完事之后你又加班加得意识模糊。")
			gain({b_exp:5,v_exp:5,e_exp:3},"上司")
			gainop("上司",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("guild_trainer4")&&status.lewd>=80) return 1
		}
	}
	ev["weakness"]={
		ev:function(){
			var att="str"
			var s="力量"
			if(status[att]>status.dex){
				att="dex"
				s="敏捷"
			}
			if(status[att]>status.wis){
				att="wis"
				s="智力"
			}
			show("在输给小程序村后，你认识到自己的弱点是"+s+"。")
			show("你对此展开了特训。")
			if(att=="str")gain({str:1})
			if(att=="dex")gain({dex:1})
			if(att=="wis")gain({wis:1})
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("goblin_prison2")) return 2
		},
		start:1,
		end:1
	}
	ev["weakness2"]={
		ev:function(){
			var att="str"
			var s="力量"
			if(status[att]>status.dex){
				att="dex"
				s="敏捷"
			}
			if(status[att]>status.wis){
				att="wis"
				s="智力"
			}
			show("在输给巨型中医史莱姆后，你认识到自己的弱点是"+s+"。")
			show("你对此展开了特训。")
			if(att=="str")gain({str:2})
			if(att=="dex")gain({dex:2})
			if(att=="wis")gain({wis:2})
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("slime_boss")) return 2
		},
		start:2,
		end:2
	}
	ev["weakness3"]={
		ev:function(){
			var att="str"
			var s="力量"
			if(status[att]>status.dex){
				att="dex"
				s="敏捷"
			}
			if(status[att]>status.wis){
				att="wis"
				s="智力"
			}
			show("在输给星座首领后，你认识到自己的弱点是"+s+"。")
			show("你对此展开了特训。")
			if(att=="str")gain({str:3})
			if(att=="dex")gain({dex:3})
			if(att=="wis")gain({wis:3})
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("orc_boss")) return 2
		},
		start:3,
		end:3
	}
	/*ev["weakness4"]={
		ev:function(){
			var att="str"
			var s="力量"
			if(status[att]>status.dex){
				att="dex"
				s="敏捷"
			}
			if(status[att]>status.wis){
				att="wis"
				s="智力"
			}
			show("在输给触手原体后，你认识到自己的弱点是"+s+"。")
			show("你对此展开了特训。")
			if(att=="str")gain({str:4})
			if(att=="dex")gain({dex:4})
			if(att=="wis")gain({wis:4})
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("tentacle_boss")) return 2
		},
		start:4,
		end:4
	}*/
}