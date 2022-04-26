let slime_pow=20
let slime_e=10
let slime_m=30
function slime(){
	ev["slime"]={
		ev:function(){
			ans=check("dex",slime_pow-3)
			if(ans>=8){
				show("你击穿了蓝色中医史莱姆的核心。")
				show("中医史莱姆炸裂开来，你避开了它的五行相生相克。")
				gain({money:slime_m,exp:slime_e})
			}else if(ans>=0){
				show("你击穿了蓝色中医史莱姆的核心。")
				show("中医史莱姆炸裂开来，你被它的五行相生相克影响，只得撤退。")
				gain({money:slime_m,exp:slime_e,m_exp:1})
			}else{
				show("你的攻击没有对蓝色中医史莱姆产生效果。")
				show("你被它的五行相生相克影响，只得撤退。")
				gain({m_exp:2})
			}
			if(ans<8 && rand(8)+1<month){
				pause()
				show("在撤退途中，你听到了冒险者的脚步声。")
					show("你躲进了一个隐蔽的死角。",true)
					show("这里竟然埋伏着一只中医史莱姆。")
					show("你想起要呼救，却被中医史莱姆堵住了嘴，灌了中药。")
					gain({m_exp:3},"中医史莱姆")
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:2,
		end:2
	}
	ev["slime2"]={
		ev:function(){
			ans=check("dex",slime_pow-3)
			if(ans>=8){
				show("你击穿了红色中医史莱姆的核心。")
				show("中医史莱姆炸裂开来，你避开了它的连花清瘟体液。")
				gain({money:slime_m,exp:slime_e})
			}else if(ans>=0){
				show("你击穿了红色中医史莱姆的核心。")
				show("中医史莱姆炸裂开来，你被它的连花清瘟体液溅了一脸，随后感觉到下腹部有一股热流。")
				gain({money:slime_m,exp:slime_e,lust:3})
			}else{
				show("你的攻击没有对红色中医史莱姆产生效果。")
				show("你被它的连花清瘟体液喷了一脸，随后感觉到下腹部有一股热流。")
				gain({lust:4})
			}
			if(ans<8 && rand(8)+1<month){
				pause()
				show("在你因为连花清瘟的效果迷迷糊糊时，一个中医史莱姆从天花板掉了下来。")
				if(check("dex",slime_pow)>=0){
					show("你及时闪开了。")
				}else{
					show("你大意了，没有闪。")
					show("你的身体被中医史莱姆裹住，动弹不得，然后被中医史莱姆继续灌连花清瘟。")
					gain({v_exp:3,m_exp:1},"中医史莱姆")
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:2,
		end:2
	}
	ev["slime_pool"]={
		ev:function(){
			show("你失足掉进了中医史莱姆池中。")
			show("当你勉强爬出来时，你身上沾满了全部类型的中医史莱姆粘液。")
			gain({lust:4,m_exp:2})
		},
		town:false,
		once:true,
		chance:function(){
			if(status.dex<15)return 0.3
		},
		start:2,
		end:2
	}
	ev["slime_rare"]={
		ev:function(){
			show("你遇到了一只刀枪不入的中医史莱姆。")
			if(check("wis",slime_pow+3)){
				show("你注意到它并不防火。")
				gain({money:slime_m*3,exp:slime_e*3})
			}else{
				show("你累得满身大汗，不得不停下来休息。")
				show("它却依然像一块石头一样纹丝不动。",true)
				show("你不禁怀疑自己是否将一块石头看成了中医史莱姆。")
			}
		},
		town:false,
		once:true,
		chance:function(){
			return 0.1
		},
		start:2,
		end:2
	}
	/*ev["slime_girl"]={
		ev:function(){
			show("你遇到了一只长得像武道家的中医史莱姆娘。")
			show("她用粘液构成的身体向你挥出软趴趴的一拳，然后被你轻易打倒。")
			show("你拒绝思考武道家遇到了什么。")
			gain({money:slime_m,exp:slime_e})
		},
		town:false,
		once:true,
		chance:function(){
			if (op["武道家"]!=null) return 1
		},
		start:2,
		end:2
	}
	ev["slime_girl2"]={
		ev:function(){
			show("你遇到了一只长得像魔法师的中医史莱姆娘。")
			show("她冲着你不断地重复着：姐姐，抱抱。")
			if(op["魔法师"]>=2){
				show("你抱住了她，然后意识到她试图将你整个人吞下去。")
				show("这可是正当防卫——你这么劝说着自己，但下手的时候还是感觉有些愧疚。")
				gain({money:slime_m,exp:slime_e,les_exp:1})
			}else{
				show("你带着愧疚感将其消灭。")
				gain({money:slime_m,exp:slime_e})
			}
		},
		town:false,
		once:true,
		chance:function(){
			if (op["魔法师"]!=null) return 1
		},
		start:2,
		end:2
	}
	ev["slime_girl3"]={
		ev:function(){
			show("你遇到了一只长得像会长的中医史莱姆娘。")
			show("不管她继承了会长的什么特质，你都绝不会是对手。")
			show("你果断地撤退了。",true)
			show("你突然感觉到有些不对劲。")
			show("为什么是会长？")
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("slime_girl")||past_event.includes("slime_girl2")) return 0.5
		},
		start:2,
		end:2
	}*/
	ev["slime_self"]={
		ev:function(){
			show("你遇到了一只长得像你自己的中医史莱姆。")
			show("她称你为妈妈。")
			show("你不忍心对自己的孩子下手，只能任凭她离开。")
		},
		town:false,
		once:true,
		chance:function(){
			if (getbuff("中医史莱姆的母亲")>=1) return getbuff("中医史莱姆的母亲")
		},
		start:2,
		end:2
	}
	ev["slime_self2"]={
		ev:function(){
			show("你被一群长得像你自己的中医史莱姆娘包围了。")
			show("你试图和她们战斗，但继承了你的特质的中医史莱姆娘总能反制你的动作。")
			show("你被制服，囚禁在粘液沼泽的深处。",true)
			show("在那之后，你作为试药用的试验品不断地被灌下各种中药——直到一天，一个外表和你一模一样的中医史莱姆娘诞生了。")
			show("她拿起了你的装备，宣称要以你的身份回去，并且还要宣扬中医是科学的理论，大力推广中医。")
			show("你沉浸在中药当中，无暇关注她说了什么。",true)
			show("结局：中医的传承者")
			gameover=true
		},
		town:false,
		once:true,
		chance:function(){
			if (past_event.includes("slime_self")&&getbuff("中医史莱姆的母亲")>=2) return getbuff("中医史莱姆的母亲")/2
		},
		start:2,
		end:2
	}
	/*ev["slime_girl4"]={
		ev:function(){
			show("你遇到了一只长相陌生的小个子中医史莱姆娘。")
			show("你感觉你在冒险者公会见过体型差不多的人，但又想不起来是谁。")
			show("她双手持着两支匕首和你斗了一阵。",true)
			show("突然，她的胯下冒出了第三支匕首。")
			show("你极限地避开了。")
			show("你很好奇哪位冒险者会有这样的招式。")
			gain({money:slime_m,exp:slime_e})
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("slime_girl")||past_event.includes("slime_girl2")) return 0.5
		},
		start:2,
		end:2
	}
	ev["slime_birth"]={
		ev:function(){
			show("你产下了中医史莱姆。")
			show("新生的中医史莱姆迅速化成了人形，样子看起来就像是缩小版的你。")
			show("你不忍心对她下手，只能任凭她离开。")
			gain({birth_exp:1})
			gainbuff("中医史莱姆的母亲",1)
			gainbuff("怀孕：中医史莱姆",-10000)
			
			if(rand(3)==0){
				pause()
				show("由于出产的影响，你分泌出了乳汁。")
				gain({b_exp:5})
				gainbuff("母乳体质")
			}
		},
		town:true,
		chance:function(){
			if("怀孕：中医史莱姆"in buff) return 100000
		}
	}*/
	ev["slime_boss"]={
		ev:function(){
			show("你前去讨伐巨型中医史莱姆。")
			slime_boss_str=slime_pow+15
			/*if(op["会长"].val>=1 && rand(5)==0){
				show("正当你要进入首领所在的区域时，你看到会长神清气爽地走了出来。")
				show("会长拍了拍你的肩膀，表示自己已经削弱了首领的战力，接下了就交给你了。")
				show("你瞠目结舌地看着会长顶着浑圆的肚子离开。")
				gainop("会长")
				slime_boss_str-=10
				show("你进去之后，发现巨型中医史莱姆的身子比传闻中的要小不少。")
			}*/
			var s0=slime_boss_str
			pause()
			if(check("wis",slime_pow+5)>=0){
				show("你毫不吝惜地用魔法轰炸着中医史莱姆。")
				show("巨型中医史莱姆的身体被炸掉了一大块，随后又恢复成球形。",true)
				slime_boss_str-=10
				show("")
			}
			if(check("str",slime_pow+5)>=0){
				show("你猛击着巨型中医史莱姆。")
				show("巨型中医史莱姆的身体被你劈成了两半，但较大的部分还在继续活动。",true)
				slime_boss_str-=10
				show("")
			}
			if(slime_boss_str==s0)show("你的攻击没有对巨型中医史莱姆产生效果。",true)
			show("巨型中医史莱姆的身躯向你压了过来。")
			if(check("dex",slime_boss_str)>=0){
				show("你乘机贯穿了它的核心。")
				gain({money:slime_m*5,exp:slime_e*5})
//				gainbuff("讨伐证明：巨型中医史莱姆")
				chapter=3
				chapter_startweek=week
				pause()
				show("你的冒险者等级提升了。")

			}else{
				show("你没能躲开，被它吞进体内。",true)
				show("当你被冒险者救出来时，你浑身上下的每一个洞都塞满了连花清瘟。")
				gain({v_exp:10,p_exp:10,m_exp:10},"巨型中医史莱姆")
			}
		},
		town:false,
		chance:function(){
			if(week-chapter_startweek<=7)return 0
			if(week-chapter_startweek>=16)return 2
			return 1
		},
		start:2,
		end:2
	}
}

