import Predictions from './Components/Predictions'

export default function Home() {

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <h4 className="text-3xl font-semibold md:text-5xl text-black">AI Video Generator</h4>
          <div className="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
            <p className="text-[#636262]">မြန်မာလို စာရေးပြီး video ထုတ်နိုင်မည့် AI Video နည်းပညာ</p>
          </div>
        </div>
      </div>
      <div>
        <Predictions />
      </div>
      <div className="mb-8 justify-items-center gap-6 sm:justify-items-stretch md:mb-12 md:gap-8 lg:mb-16">
        <div className="relative mb-4 flex flex-col place-items-center justify-between gap-6 rounded-2xl dark:bg-slate-800 shadow-md  border-slate-200 border border-solid  bg-white px-12 pb-8 pt-16 max-[767px]:mt-4 md:mb-8  md:pb-8 md:pt-16 lg:mb-4">
          <div className="mb-4 flex flex-col items-center">
            <h6 className="font-semibold text-2xl">How to use</h6>
          </div>
          <p>စာသားကနေ video ထုတ်ပေးနိုင်သည့် Writtech AI Myanmar - AI Video နည်းပညာကိုအသုံးပြုရန် အောက်ပါအဆင့်အတိုင်းအသုံးပြုနိုင်ပါသည်:</p>
          <p className='text-left'>  <span className="text-base font-semibold">အဆင့် (၁): ထုတ်ချင်သည့် အကြောင်းအရာကို မြန်မာလို ရိုက်ထည့်ပါ</span> - မြန်မာလိုရိုက်ထည့်ပြီးရင် ခဏစောင့်ပါ။ မြန်မာစာသားတွေကို English လိုပြောင်းပေးသွားပါလိမ့်မယ်။ English လိုပြောင်းသွားသည့်အခါ Go ဆိုသည့် ခလုပ်လေးကိုနိုပ်ပြီးခဏစောင့်ပါ။ ပုံထွက်လာပါလိမ့်မယ်။ </p>
          <p>  <span className="text-base font-semibold">အဆင့် (၂): ပုံထွက်လာသည့်အခါ video ထွက်လာဖို့ ခဏစောင့်ပါ</span> - ပုံထွက်လာပြီးလျှင် video ထုတ်ပေးဖို့ အလုပ်လုပ်နေပါလိမ့်မယ်။ vidoe ထွက်လာဖို့အချိန်က စာသားအနည်းအများပေါ်မှုတည်ပြီး ကြာနိုင်ပါတယ်.</p>
          <p>  <span className="text-base font-semibold">အဆင့် (၃): Video ကို download လုပ်နိုင်ပါပြီ</span> - Video ထွက်လာရင် download ခလုပ်လေးကနေ video ကို download လုပ်နိုင်ပါတယ်။ ထွက်လာသည့် ရလဒ်ကိုမကျေနပ်သေးပါက နောက်ထပ်စာပြန်ရေးပြီး ပြန်ထုတ်နိုင်ပါတယ်။</p>
          <p>  Writtech AI Myanmar - AI Video နည်းပညာကို ပိုတိုးတက်လာအောင် update တွေနဲ့ လုပ်ဆောင်နေပါတယ်။ Writtech AI Myanmar website မှာ membership plan များဝယ်ယူထားပါက update တွေကို အသုံးပြုနိုင်ပါတယ်။ Writtech AI Myanmar membership plan များဝယ်ယူလိုပါက Infinity Tech page ကို ဆက်သွယ်နိုင်ပါတယ်</p>
        </div>
      </div>
    </section>
  )
}
