import { UITypes } from '../types'
import { Dispatch } from 'redux'

export const handleCredInputBorder = (e:any) => (dispath:Dispatch) =>{
    const fields = document.querySelectorAll('.cred__field')
    fields?.forEach(f => f.classList.remove('active'))
    e.target.classList.add('active')
    dispath({
        type:UITypes.HANDLE_CRED_INPUT_BORDER
    })

}

export const handleCredInputFocus = (e:any) => (dispath:Dispatch) =>{
    const input = e.target.querySelector('input')
    input.focus()
    dispath({
        type:UITypes.HANDLE_CRED_INPUT_FOCUS
    })
}

export const handleSidebar = () => (dispath:Dispatch) =>{
    const sidebar = document.querySelector('.sidebar') as HTMLDivElement
    if(sidebar){
      if(!sidebar?.classList.contains('active')){
        sidebar.classList.add('active')
        dispath({
          type:UITypes.HANDLE_SIDEBAR
        })
      }else{
        sidebar.classList.remove('active')
        dispath({
          type:UITypes.HANDLE_SIDEBAR
        })
      }
    }
  }