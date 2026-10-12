export interface SuppliedBrand {name:string;slug:string;affiliateUrl:string;coupon?:string;received:string}
// Supplied by the site owner. Referral parameters are not checkout coupon codes.
const entries: [string,string,string,string?][] = [
 ['微风网络 Breezenet','breezenet','https://edp01.breezenetaff.com/#/?code=4KDOroY0','weifeng90'],
 ['飞猫云','flycat','https://flycat1.flycatvipaff.cc/#/?code=Os3T3OxW','flycat888'],
 ['暮光网络','twilight','https://varnexa.twilightaff.com/#/?code=3qqonTlH'],
 ['大佬云','dalaocloud','https://vip.dalaocloud.com/#/?code=Cp2sfYZg'],
 ['Firefly机场','firefly','https://vip02.fireflyaff.com/#/?code=Fes6j9rn','firefly'],
 ['灵猫','civet','https://vip02.civetaff.com/#/?code=kZlRw46w'],
 ['闪跃 FlashLeap','flashleap','https://vip02.flashleapaff.com/#/?code=FkCGEeaC','shanyue'],
 ['无忧链接','worryfree','https://wep01.worryfreeaff.com/#/?code=56A0RTpU','wuyou666'],
 ['跨界云','kuajie','https://vip02.kuajieaff.com/#/?code=VfWeYwHM'],
 ['星岛梦 StarDream','stardream','https://kfccbb.xingdaomeng.com/#/?code=JTRIWFim','nmw888'],
 ['光速云 LightSpeed','lightspeed','https://mdlky.gsyaff.com/#/?code=6tRWbtgK','jichangcha09'],
 ['唯兔云（V2云）','v2yun','https://fast.v2yunvipaff.com/#/?code=xYEe8gyb','rabbit'],
 ['U1S1（有一说一）','u1s1','https://pkdj7.vipaff.cc/#/?code=NMjmHbvu','U1S1'],
 ['极连云','jilian','https://kdjhao.jlyvipaff.com/#/?code=poyoU7mq'],
 ['全球云','globalcloud','https://sswdh.gcvipaff.com/#/?code=NE1AcNIX','tt88'],
 ['光年梯','guangnianti','https://ggmq.gntaff.com/#/?code=RAJFvngV'],
 ['Sogo云','sogo','https://wzjc.sogoyunaff.cc/#/?code=2x2EywO9'],
 ['宇宙云 YuZhou','yuzhou','https://wzjc.yuzoucloud.cc/#/?code=wL7YStBa','YUZHOU553'],
 ['二猫云 2mao','2mao','https://waaa.2maoyunaff.cc/#/?code=uHeyKG44'],
 ['一翻云 1fly','1fly','https://wzjc.1flyunaff.cc/#/?code=F7eaT191'],
 ['边缘节点 EdgeNova','edgenova','https://work.edgenovaaff.cc/#/?code=z81zCfw1'],
 ['可信云','kosing','https://work.kosingaff.com/#/?code=BNsA58Es'],
 ['速界 SuJie','sujie','https://work.speedworldaff.cc/#/?code=wSjLCpIf'],
 ['快狸 KuaiLi','kuaili','https://work.kuailicloud.cc/#/?code=gVGJa0Mp'],
 ['飞V','flyv','https://varnexa.flyvaff.com/#/?code=UoU2Izm5'],
 ['梯子云 LadderCloud','laddercloud','https://varnexa.ladderaff.com/#/?code=kuE4kqxo'],
 ['浪网 WaveNet','wavenet','https://varnexa.wavenetaff.com/#/?code=oU77JXen'],
 ['灵动云','lingdong','https://varnexa.lingdongaff.com/#/?code=QcRK6OPG'],
 ['隐形人','invisible','https://varnexa.invisibleaff.com/#/?code=JF4seZUy']
];
export const suppliedBrands:SuppliedBrand[]=entries.map(([name,slug,affiliateUrl,coupon])=>({name,slug,affiliateUrl,coupon,received:'2026-10-12'}));
export const couponBrands=suppliedBrands.filter(b=>b.coupon);
