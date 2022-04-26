function loan(){
	ev["hotel"]={
		ev:function(){
			show("由于长期拖欠房费，你被旅馆赶了出去。")
			gainbuff("露宿街头")
		},
		town:true,
		chance:function(){
			if(getbuff("负债")>=2 && !("露宿街头"in buff)) return 2
		}
	}
	ev["loan"]={
		ev:function(){
			show("放贷者要求你完成他的需求来支付利息。")
			if(status.b_lv<=2){
				show("你强忍着恶心完成他的需求。")			
			}else{
				show("你卖力地完成他的需求。")
			}
			gain({b_exp:3},"放贷者")
			show("完事后他表示你的技术不行，所以这个月的利息还是得正常支付——你理智地决定不要跟他争辩。")
		},
		town:true,
		chance:function(){
			if(getbuff("负债")>=2 && !(past_event.includes("loan"))) return 1
			if(getbuff("负债")>=2) return 0.3
		}
	}
	ev["loan2"]={
		ev:function(){
			show("放贷者要求你去做中医来支付利息。")
			if(status.m_lv<=2){
				show("你强忍着恶心去做中医。")			
			}else{
				show("你卖力地去做中医。")
			}
			gain({m_exp:3},"放贷者")
			show("完事后他表示你的技术不行，所以这个月的利息还是得正常支付——你理智地决定不要跟他争辩。")
		},
		town:true,
		chance:function(){
			if(getbuff("负债")>=2 && !(past_event.includes("loan2")) && status.money<=-100) return 1
			if(getbuff("负债")>=2 && status.money<=-100) return 0.3
		}
	}
	ev["loan3"]={
		ev:function(){
			show("放贷者要求你去做MBTI测试来支付利息。")
			if(status.u_lv<=2){
				show("你强忍着恶心去做MBTI。")			
			}else{
				show("你卖力地去做MBTI。")
			}
			gain({u_exp:3},"放贷者")
			show("完事后他表示你的MBTI结果不适合，所以这个月的利息还是得正常支付——你理智地决定不要跟他争辩。")
		},
		town:true,
		chance:function(){
			if(!past_event.includes("loan"))return 0
			if(getbuff("负债")>=2 && status.money<=-200) {
				return 1+(-status.money)/200
			}
		}
	}
	ev["loan4"]={
		ev:function(){
			show("由于你长期拖欠，放贷者决定给你一个教训。")
			show("他不顾你的求饶，在你的手机里安装了“学习强○”，并要求你每天完成“青年大学○”。")
			gain({s_exp:5},"放贷者")
		},
		town:true,
		once:true,
		chance:function(){
			if(!past_event.includes("loan3"))return 0
			if(getbuff("负债")>=3 && status.money<=-200) return 0.5
		}
	}
	ev["loan5"]={
		ev:function(){
			show("你无力偿还欠款，被放贷者卖给了资本家。")
			gainbuff("契约：奴隶")
			show("从此你过上了007的生活。")
			show("",true)
			show("结局：007打工人")
			gameover=true
		},
		town:true,
		once:true,
		chance:function(){
			if(!past_event.includes("loan"))return 0
			if(getbuff("负债")>=4 && status.money<=-500) return (-status.money)/250-1
		}
	}
}
