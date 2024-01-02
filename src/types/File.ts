import TState from './States'

type TFile = {
  title: string
  description: string
  path: string
  position: string
  _id: string
  status: TState
}

export default TFile
