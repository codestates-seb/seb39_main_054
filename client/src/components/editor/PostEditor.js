import React from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';


const PostEditor =({value , editorRef, onChange}) => {
  return (
  //   
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
  )
}


export default PostEditor