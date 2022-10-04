import React from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';
import styled from 'styled-components';


const PostEditor =({value , editorRef, onChange}) => {
  return (
    <Div>
  <Editor
        placeholder="입력해주세요"
        previewStyle="vertical" 
        height="500px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        initialValue={value}
        ref = {editorRef}
        onChange = {onChange}
        toolbarItems={[
        
          ['bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table']
        ]}
      ></Editor>
      </Div>
  )
}
const Div = styled.div`

.ck-editor__editable {
    min-height: 42.5rem;
  }
  .ck .ck-editor__main > .ck-editor__editable {
    background: #fff;
  }
  .toastui-editor-defaultUI {
    border: solid 0.1875rem;
    border-color: ${(props) => props.theme.gray5};
  }
  .toastui-editor-defaultUI-toolbar {
    background-color: ${(props) => props.theme.bgColor};
    border-color: ${(props) => props.theme.gray5};
  }
  .toastui-editor-defaultUI-toolbar button {
    border: 1px solid;
    border-color: ${(props) => props.theme.gray5};
  }
  .toastui-editor-contents {
    font-size: 1.2rem;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
  }
  .toastui-editor-mode-switch {
    background-color: ${(props) => props.theme.bgColor};
    border-top: 1px solid;
    border-color: ${(props) => props.theme.gray5};
  }
  .toastui-editor-mode-switch .tab-item {
    background: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    border: 1px solid;
    border-color: ${(props) => props.theme.gray5};
  }
  .toastui-editor-contents p {
    color: ${(props) => props.theme.textColor};
  }
  .ProseMirror .placeholder {
    font-size: 1.2rem;
  }
`


export default PostEditor