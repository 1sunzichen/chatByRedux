const express=require("express");
const Router=express.Router();
const utils=require("utility")
const model=require("./model");
const User=model.getModel("user");
const Chat=model.getModel("chat");
const _filter={'pwd':0,"__v":0}
Router.get("/list",function(req,res){
    const {type}=req.query;
    User.find({type},function(err,doc){
       return  res.json({code:0,data:doc}) 
    })
})

Router.get("/info",function(req,res){
    //用户有没有cookie
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:"后段出错了"})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
Router.post('/update',function(req,res){
    //console.log(res.cookie);
    
    const useid=req.cookies.userid;
    if(!useid){
        return json.dumps({code:1})
    }
    const body=req.body;
    User.findByIdAndUpdate(useid,body,function(err,doc){
        const data=Object.assign({},
            {
                user:doc.user,
                type:doc.type
            },body)
            console.log(data);
            
            return res.json({code:0,data:data})
    })
})
Router.get("/d",function(req,res){
     User.remove({},function(err,doc){
         if(err){
             res.json(err)
         }else{
             res.json(doc)
         }
     });
    //
    return 
})
Router.post('/readmsg',function(req,res){
    const userid=req.cookies.userid;
    const {from}=req.body;
    console.log("from",from,userid,"userid");
    Chat.update(
        {from,to:userid},{"$set":{read:true}},
        {'multi':true},function(err,doc){
            console.log(doc);
            
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:"修改失败"})
    })
    
})
Router.post('/login',(req,res)=>{
    const {user,pwd}=req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err,doc){
        if(!doc){
            return res.json({code:1,msg:"用户名重复了"})
        }
            res.cookie("userid",doc._id)
            return res.json({code:0,data:doc,msg:"ok"})
        }
    )
})
Router.post('/reg',(req,res)=>{
    console.log(req.body.data);
    const {user,pwd,type}=req.body;
    User.findOne({user},function (err,doc){
        if(doc){
            return res.json({code:1,msg:"用户名重复了"})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
        }
    )
})
function md5Pwd(pwd){
    const salt='ekko_307';
    return utils.md5(utils.md5(salt+pwd));
}
//chat redux
Router.get('/getMsgList',function(req,res){
    const user=req.cookies.userid;
    User.find({},function(error,userdoc){
        let users={};
        userdoc.forEach(v=>{
            users[v._id]={
                name:v.user,avatar:v.avatar
            }
        })
        
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})
module.exports=Router;