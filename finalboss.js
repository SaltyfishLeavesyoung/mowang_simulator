let succubus_pow=35
let succubus_m=80
let succubus_e=40
function finalboss(){
	ev["succubus"]={
		ev:function(){
			show("你被魅魔从后方偷袭了。")
			show("她一边玩弄着你的胸部，一边在你的耳边低语着“这就是○○”。")
			if(check("str",succubus_pow-5+status.b_lv)>=0){
				show("你挣脱了她的控制。")
				gain({money:succubus_m,exp:succubus_e,s_exp:1})
			}else{
				show("你沉迷于快感，没有挣脱。")
				gain({s_exp:5})
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}

	ev["succubus2"]={
		ev:function(){
			show("魅魔对你释放了魅惑魔法。")
			if(check("wis",succubus_pow-5+status.m_lv)>=0){
				show("你抵抗住了诱惑。")
				gain({money:succubus_m,exp:succubus_e})
			}else{
				show("你按照魅魔的指示开始听沈○老师的课。")
				gain({s_exp:5})
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}

	ev["succubus3"]={
		ev:function(){
			show("魅魔对你释放了催眠魔法。")
			if(check("wis",succubus_pow)>=0){
				show("你没有中招。")
				gain({money:succubus_m,exp:succubus_e})
			}else{
				show("你觉得自己没有中招。")
				gainbuff("催眠")
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}

	ev["succubus4"]={
		ev:function(){
			if(check("dex",status.les_lv+succubus_pow-5)>=0){
				show("你抵抗住诱惑，消灭了一个魅魔。")
				gain({money:succubus_m,exp:succubus_e})
			}else{
				show("你击倒了一个魅魔。")
				show("看着她美丽的外表，你没能下死手，只是让她离开，别再袭击人类。")
				show("魅魔在离开前给了你一本《○○○谈治国理政》。")
				gain({money:50,s_exp:5},"魅魔")
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}

	/*ev["succubus_assassin"]={
		ev:function(){
			if(week<=op["刺客"].prison){
				show("你从一个诡异的魔法阵当中救出了刺客，她的下腹部多了一个淫纹。")
				show("刺客感谢了你的帮助。")
				show("你很清楚她接下来会做什么。")
				gain({v_exp:4,a_exp:4,s_exp:2,les_exp:2},"刺客")
				op["刺客"].val+=10000
				gainop("刺客")
				gainbuff("刺客的密友")
			}else{
				show("你遇到了被转化为魅魔的刺客。")
				show("她的肤色变成了暗色，背后多了小巧的翅膀和可爱的尾巴，还有，她的扶她肉棒变得更大了。")
				show("她要求你尽快离开——赶在她控制不住扶她魅魔的本能之前。",true)
				show("")
				show("刺客退出了冒险者公会。")
				if("刺客的密友" in buff){
					gainbuff("刺客的密友",-10000)
				}
			}
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("assassin5_1")) return 2
		},
		start:5,
		end:5
	}*/

	ev["succubus3_after"]={
		ev:function(){
			/*if("触手服"in buff){
				show("当你恢复意识时，你发现自己身上的触手服不见了，除此之外毫无异样。")
				show("你觉得唯一合理的解释就是——魅魔对你身上的触手服的兴趣超过了对你的兴趣。")
				gainbuff("触手服",-10000)
				return
			}
			ans=rand(3)
			if(ans==0){
				show("当你恢复意识时，你正躺在一间男厕里，满身都是精液。")
				gain({v_exp:8,a_exp:4,o_exp:6,s_exp:6,u_exp:2,e_exp:5},"路人")
				gainbuff("公共厕所",1)
			}else if(ans==1){
				show("当你恢复意识时，你正以光着身子，在哥布林的身后爬行。")
				gain({v_exp:5,o_exp:3,p_exp:5,e_exp:5,s_exp:3,u_exp:2},"哥布林")
			}else{
				show("当你恢复意识时，你正在和魔法师共享一根双头假阳具，而武道家骑在刺客的身上扭动身体。")
				gain({v_exp:6,b_exp:3,o_exp:5,les_exp:10,a_exp:3,s_exp:1},"刺客")
			}*/
			show("当你恢复意识时，你发现你已经写好了入party申请书。")
			gain({s_exp:5})
			gainbuff("催眠",-10000)
		},
		town:true,
		chance:function(){
			if("催眠"in buff)return 10000
		},
		start:4,
		end:4
	}

	ev["guild_succubus"]={
		ev:function(){
			show("同事召集了公会的成员。")
			show("她宣布魔王要回来了，她感受到了对方的魔力。")
			show("她掀开上衣，展示出自己的小腹。")
			show("那里有着一个心形纹路，散发着微弱的粉色光芒。",true)
			show("同事表示自己当年在讨伐魔王时受到了诅咒，在与魔物交合时能够获得加倍的快感，却无法对人类的身体产生任何反应。")
			show("魔王认为这样就会让她堕落，但她坚持下来了。")
			show("她也会继续坚持下去。")
			op["同事"].prison=week+2
		},
		town:false,
		once:true,
		chance:function(){
			if(week-chapter_startweek>=4) return 2
		},
		start:4,
		end:4
	}

	ev["guild_succubus2"]={
		ev:function(){
			show("你前往公会办理手续时，发现同事只穿着内衣。")
			show("同事表示，这是为了让别人时刻监督自己身上淫纹的恶化程度。")
			gainop("同事")
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("guild_succubus")&&getop("同事")>=3)
				return 1
		},
		start:4,
		end:4
	}
	ev["guild_succubus3"]={
		ev:function(){
			show("同事召集了公会的成员。")
			show("她宣布自己已经坚持不下去了，然后她身上的淫纹发出了耀眼的光芒。")
			show("当光芒散去时，同事已经变成了魅魔。")
			show("人群一片慌乱。",true)
			show("上司站了出来，表示自己掩护，让你们先撤。")
			show("但同事没有袭击任何人，张开翅膀逃跑了。",true)
			show("同事退出了冒险者公会。")
			op["同事"].val-=10000
			show("",true)

			show("你决定前去讨伐魔王，将同事带回来。")
			show("“是时候给过去的恩怨做个了断了。”")
		},
		town:true,
		once:true,
		chance:function(){
			if(week>op["同事"].prison && op["同事"].prison!=null && op["同事"].prison!=0)return week-op["同事"].prison
		},
		start:4,
		end:4
	}
	ev["succubus_boss"]={
		ev:function(){
			show("你踏入了魔王的宫殿。")
			show("“不要大意！那是前代魔王的女儿！”上司大喊着。")
			show("你反应慢了一步，被她触碰了身体。")
			gainbuff("淫纹")
			var cnt=status.orgasm+50
			show("你注意到自己的下腹部出现了一个心形纹路，上面闪烁着数字50。")
			show("",true)
			show("“只是战斗的话，未免也太无趣了，让我们来玩个游戏吧。”")
			show("“游戏规则很简单——在倒计时五十次之后，你就会被转化成魅魔。”")
			show("“不论你是否救出同事，你都会和她再度成为同伴。”魔王自认为讲了一个不错的笑话，怪笑着消失了。",true)
			show("“按照惯例，在挑战我之前，你必须先打倒我手下的四大天王。”魔王不知在何处解说着。")
			show("",true)
			show("总之跳过打败“月球天王”人赢，“楠桐天王”夜宝，“缺德天王”小乖，“偶像天王”雪灵灵，“bot天王”ue这四天王的情节。")
			show("",true)
			show("你发现魔王竟然是群陈睿——82t星人。")
			show("“居然能做到这种程度，就让我称赞你一下吧。”魔王说道，“但是，你也就到此为止了。”")
			var hp=4
			show("“按照魔王的惯例，这时候应该说一些‘成为我的人吧’之类的话，但是，既然你已经注定要成为我的人了。再说这种话也没什么意思。”")
			show("魔王剩余生命值："+hp,true)
			show("“按照冒险者的惯例，看到血条就可以进攻了。”你回答道。",true)
			while(hp>0){
				var ans=check("max",succubus_pow+10)
				if(ans>=10){
					show("你的攻击命中了魔王的要害，魔王受到重创。")
					hp-=2
				}else if(ans>=0){
					show("你的攻击命中了魔王。")
					hp-=1
				}else{
					show("你的攻击被魔王躲开了。")
				}
				show("魔王剩余生命值："+hp)
				pause()
				if(hp>0){
					var a2=rand(3)
					if(a2==0){
						show("魔王看了你一眼，你就立刻产生了反应。")
						gain({orgasm:rand(10)+1})
					}else if(a2==1){
						show("魔王接近了你的身体，用指尖轻轻触碰你的下腹。快感随着淫魔的魔力涌入你的身体。")
						gain({orgasm:rand(10)+10})
					}else{
						show("你躲开了魔王的攻击。")
					}
					if(a2!=2){
						var cnt2=cnt-status.orgasm
						if(cnt2<=0){
							show("淫纹上的数字变成了0。")
							show("你感到身体内有一种奇妙的感觉。")
							show("你意识到自己无法抗拒，也不必抗拒。")
							show("你躺倒在地，任凭快感传遍全身上下，体内体外的每一个位置。")
							show("粉色的光芒笼罩了你，你抵达了前所未有的强烈高潮。")
							show("当光芒散去时，你成为了巴尔坦星人。",true)
							show("几个月后，你作为巴尔坦星的先锋入侵了地球。")
							show("结局：魔王的先锋")
							gameover=true
							return
						}else{
							show("淫纹上的数字变成了"+cnt2+"。")
						}
					}
				}
			}
			
			show("终于，魔王倒下了。")
			show("“叔叔一定会替我报仇的……”她留下了不妙的台词，亦或是续作的线索。")
			op["同事"].val+=10000

			pause()
			show("")
			var max_op=5
			chapter=6
			
			if(status.v_virgin==""){
				show("你们尝试了各种手段，也没能让同事从魅魔变回人类。")
				show("同事和上司决定去向遥远国度的贤者寻求帮助，他们一同踏上了旅途……",true)
				show("等一下……你居然还是处男，这怎么可能？")
				show("你怎么可能从这么多随机事件当中幸免？",true)
				show("结局：天命之子或者风灵月影")
				gameover=true
				return
			}
			
			show("你们尝试了各种手段，也没能让同事从魅魔变回人类。")
			show("同事和上司决定去向遥远国度的贤者寻求帮助，他们一同踏上了旅途。",true)
			show("而你则继续在满是学姐的群里跟大家聊天吹水，就好像什么都没发生过一样。",true)
			show("结局：回归日常")
			gameover=true
			return
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("guild_succubus3"))
				return 10000
		},
		start:4,
		end:4
	}
}