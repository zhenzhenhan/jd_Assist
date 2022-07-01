module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://plogin.m.jd.com', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '', //请求的时候使用这个api就可以
        },
        Headers: {
          cookie:
            'wxa_level=1; retina=1; cid=9; jxsid=16523205230699091769; appCode=ms0ca95114; webp=1; __jda=122270672.1652320523361824361221.1652320523.1652320523.1652320523.1; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1652320523362; __jdc=122270672; mba_muid=1652320523361824361221; visitkey=57724516120692170; PPRD_P=UUID.1652320523361824361221; sc_width=390; shshshfpa=51f783ef-b9e3-f0c5-b28e-a93075a71bed-1652320530; _gia_s_local_fingerprint=cc9696a167a17ff332e4adbfc6d98f19; shshshfpb=tCExhv6YNJ3M-7Ed9UPsS1g; guid=e87930b970b224df41ddacd4228e3379f5b7d27c1fe657dca6f24ee8106c7931; lang=chs; lsid=47g5gf2d4aux67bm1k934tgfk5dagqmkx3qejsrn3mlauwwv1652320531427; _gia_s_e_joint={"eid":"56SJOYVAYGWMCSXBR54S4C3FEXDPVW7XL5X7Z7Y4RWQYBVIMHZVCOZFJMNUFTOH42OCUIMIKJG4PW7K6AVPZUF4Z54","ma":"","im":"","os":"Mac OS X (iPhone)","ip":"183.95.34.205","ia":"","uu":"","at":"6"}; jcap_dvzw_fp=MPBxVQHVjbhvVuJojMNWiM0D92l36CEnknMBPV2-D8udq4rFOV8Yh76LhGn-t1KYjYFTaw==; whwswswws=; TrackerID=CjWg-iIaG1wCShVUmrjB8GBwP2Q1EOxzvzjGgev9e8dTROoIsirhPadd8DLPvR6qXrQN_PAtq7dSapnTFk35881rBjEAFgHvoLzq8SMRCmB7sSdHOvIj2j286QG41OzW0rV_8VzGgRot12BtYpc7cQ; __wga=1652321388956.1652320530450.1652320530450.1652320530450.4.1; jxsid_s_t=1652321388990; jxsid_s_u=https%3A//home.m.jd.com/myJd/newhome.action; equipmentId=56SJOYVAYGWMCSXBR54S4C3FEXDPVW7XL5X7Z7Y4RWQYBVIMHZVCOZFJMNUFTOH42OCUIMIKJG4PW7K6AVPZUF4Z54; fingerprint=cc9696a167a17ff332e4adbfc6d98f19; deviceVersion=604.1; deviceOS=ios; deviceOSVersion=13.2.3; deviceName=Safari; shshshfp=bab9deec50f9ae2649687babf051d1d4; wqmnx1=MDEyNjM1MnQvLjEyMTJvYSBvQ1AgMyAgTyBlaTU1VGxHKXMxM2k1IHI0ZDA4MjJzNFUtNTFPQ0gqKCk%3D; autoOpenApp_downCloseDate_jd_homePage=1652321966710_1; lstoken=gki60r4w; __jdb=122270672.24.1652320523361824361221|1.1652320523; mba_sid=16523205233622217515002062522.24; shshshsID=befc6d008ccd04e80e17648f0de7f8b1_16_1652323332338; 3AB9D23F7A4B3C9B=56SJOYVAYGWMCSXBR54S4C3FEXDPVW7XL5X7Z7Y4RWQYBVIMHZVCOZFJMNUFTOH42OCUIMIKJG4PW7K6AVPZUF4Z54; __jd_ref_cls=MLoginRegister_SMSPhoneInput',
        },
      },
    },
  },
}
