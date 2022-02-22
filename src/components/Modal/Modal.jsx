import React from 'react'
import { CloseOutlined } from '@ant-design/icons';
import './modal.css'

const Modal = (props) => {
    const { open, close, header } = props;

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <div className="close">
                            <CloseOutlined className="closebutton" onClick={close}/>
                        </div>
                    </header>
                    <main>
                        {props.children}
                    </main>
                </section>
            ) : null}
        </div>
    )
}

export default Modal
