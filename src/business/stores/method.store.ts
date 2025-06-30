import { acceptHMRUpdate, defineStore } from 'pinia';
import { ApplicationError } from '@core/errors';

type FilterType = 'all' | 'active' | 'inactive';
type Method = {
  id: number;
  label: string;
  status: FilterType;
};

export const useMethodStore = defineStore({
  id: 'business.method',
  state: () => {
    return {
      filter: 'all' as FilterType,
      methods: [] as Method[],
      nextId: 0
    };
  },
  getters: {
    findMethod: state => {
      return (id: number): Method => {
        const method = state.methods.find(method => method.id === id);
        if (method === undefined)
          throw new ApplicationError('method not found');
        return method;
      };
    },
    findMethodIndex: state => {
      return (id: number): number => {
        const methodIndex = state.methods.findIndex(method => method.id === id);
        if (methodIndex === undefined)
          throw new ApplicationError('method not found');
        return methodIndex;
      };
    },
    activeMethods: state => {
      return state.methods.filter(method => method.status === 'active');
    },
    inactiveMethods: state => {
      return state.methods.filter(method => method.status === 'inactive');
    },
    filteredMethods(state): Method[] {
      switch (state.filter) {
        case 'active':
          return this.activeMethods;
        case 'inactive':
          return this.inactiveMethods;
        default:
          return this.methods;
      }
    }
  },
  actions: {
    addMethod(label: string) {
      this.methods.push({ id: this.nextId++, label, status: 'active' });
    },
    toggleMethod(id: number) {
      const method = this.findMethod(id);
      method.status = method.status === 'active' ? 'inactive' : 'active';
    },
    removeMethod(id: number) {
      const index = this.findMethodIndex(id);
      this.methods.splice(index, 1);
    }
  }
});

// HMRされたときにStoreの状態を維持する
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMethodStore, import.meta.hot));
}
