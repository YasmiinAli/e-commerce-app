import React from 'react'

export default function Footer() {
  return (
    <div className="bg-body-tertiary p-5 ">
      <div className="fs-5">Get the FreshCart App</div>
      <p className="text-muted">
        We will send you link, open it on your phone to download the app
      </p>

<div className="container">
          <div className="row border-bottom pb-3">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control "
            placeholder="Enter your email..."
          />
        </div>
        <div className="col-md-2">
          <button className="btn bg-main text-light">Share App Link</button>
        </div>
      
</div>
</div>
      
<div className="container">
  <div className="row mt-3">
          <div className=' col-md-6'>
          <div className="row g-0">
            <p className='col-md-6'>Payment Partenrs</p>
          <div className='col-md-6'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/2560px-Amazon_Pay_logo.svg.png" alt="" className='footerImg'/>
            <img src="data:image/png;base64,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" alt="" className='footerImg'/>
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png" alt="" className='footerImg'/>
          </div>
          </div>
        </div>
        <div className="col-md-6">
           <div className="row g-0">
            <p className='col-md-6'>Get deliveries with FreshCart </p>
<div className='col-md-6'>
  <img src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Image.png" alt="" className='downloadApp'/>
  <img src="https://www.pngmart.com/files/10/Get-It-On-Google-Play-PNG-Transparent-Image.png" alt="" className='downloadApp'/>
</div>
           </div>
        </div>
</div>
</div>
      </div>

  )
}
