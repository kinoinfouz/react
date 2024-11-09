import '@/layouts/error/style.css'

import bgError from '@/assets/bg_404.svg'

const Error404 = () => {
  return (
    <div className={'page-content'}>
      <div className={'content-wrapper'}>
        <div className={'content-inner'}>
          <div className={'content d-flex justify-content-center align-items-center'}>
            <div className={'flex-fill'}>
              <div className={'text-center mb-4'}>
                <img src={bgError} className="img-fluid mb-3" height="230" alt=""/>

                <h1 className="display-3 fw-semibold lh-1 mb-3">
                  404
                </h1>

                <h6 className="w-md-25 mx-md-auto">
                  Oops, an error has occurred. <br/> The resource requested could not be found on this server.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error404
