/// <reference path="../../../webviewer.d.ts" />
import WebViewer, {WebViewerInstance} from '@pdftron/webviewer'

import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import ErrorHandler from '../../utils/ErrorHandler'

type PropeType = {
  file?: any
}

const FileViewer = ({file}: PropeType) => {
  console.log(file)

  const viewer = useRef(null)
  const {fileId} = useParams()
  const [viewerInstance, setViewerInstance] = useState<WebViewerInstance>()
  const [fileData, setfileData] = useState(null)

  const tex = async () => {
    try {
      await viewerInstance.Core.documentViewer.loadDocument(file.path)
    } catch (error) {
      ErrorHandler(error)
    }
  }
  useEffect(() => {
    if (!viewerInstance) {
      const loaud = () => {
        WebViewer(
          {
            path: `/${process.env.PUBLIC_URL}`,
            licenseKey:
              'demo:1698486675363:7cf3a92e030000000091ed1a992aaf72330e0db5c8390e69e84c9f38cf',
            initialDoc: file ? file.path : '',
          },
          viewer.current
        ).then(function (instance: any) {
          setViewerInstance(instance)

          const docViewer = instance.docViewer

          const annotManager = instance.annotManager
          const Tools = instance.Tools
          const Annotations = instance.Annotations
        })
      }
      loaud()
    }
  }, [fileId, fileData])

  useEffect(() => {
    if (viewerInstance) {
      console.log('viewerInstance', viewerInstance)
      tex()
    }
  }, [file, viewerInstance])

  return (
    <div className='webviewerContainer'>
      <div className='webviewer' ref={viewer} style={{height: '76vh'}}></div>
    </div>
  )
}

export default FileViewer
