/// <reference path="../../../webviewer.d.ts" />
import WebViewer, {WebViewerInstance} from '@pdftron/webviewer'

import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import ErrorHandler from '../../utils/ErrorHandler'
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  FormFields,
  FormDesigner,
  Inject,
} from '@syncfusion/ej2-react-pdfviewer'

type PropeType = {
  file?: any
}

const FileViewer = ({file}: PropeType) => {
  console.log(file)

  // const viewer = useRef(null)
  // const {fileId} = useParams()
  // const [viewerInstance, setViewerInstance] = useState<WebViewerInstance>()
  // const [fileData, setfileData] = useState(null)

  // const tex = async () => {
  //   try {
  //     await viewerInstance.Core.documentViewer.loadDocument(file.path)
  //   } catch (error) {
  //     ErrorHandler(error)
  //   }
  // }
  // useEffect(() => {
  //   if (!viewerInstance) {
  //     const loaud = () => {
  //       WebViewer(
  //         {
  //           path: `/${process.env.PUBLIC_URL}`,
  //           licenseKey:
  //             'demo:1698486675363:7cf3a92e030000000091ed1a992aaf72330e0db5c8390e69e84c9f38cf',
  //           initialDoc: file ? file.path : '',
  //         },
  //         viewer.current
  //       ).then(function (instance: any) {
  //         setViewerInstance(instance)

  //         const docViewer = instance.docViewer

  //         const annotManager = instance.annotManager
  //         const Tools = instance.Tools
  //         const Annotations = instance.Annotations
  //       })
  //     }
  //     loaud()
  //   }
  // }, [fileId, fileData])

  // useEffect(() => {
  //   if (viewerInstance) {
  //     console.log('viewerInstance', viewerInstance)
  //     tex()
  //   }
  // }, [file, viewerInstance])
  console.log(file)
  return (
    <div>
      {file ? (
        <div className='control-section'>
          <PdfViewerComponent
            id='container'
            documentPath={file?.path}
            resourceUrl='https://cdn.syncfusion.com/ej2/23.1.40/dist/ej2-pdfviewer-lib'
            style={{height: '640px'}}
          >
            <Inject
              services={[
                Toolbar,
                Magnification,
                Navigation,
                Annotation,
                LinkAnnotation,
                BookmarkView,
                ThumbnailView,
                Print,
                TextSelection,
                TextSearch,
                FormFields,
                FormDesigner,
              ]}
            />
          </PdfViewerComponent>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default FileViewer
