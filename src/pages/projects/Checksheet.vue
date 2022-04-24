<template>
    <div>
        <div>
            <CListGroupItem class="mb-2" 
                v-for="(item, index) in checksheet.checklist" :key="item.id"
                @click="list_accord = index">
                <div  
                    class="rounded-md bg-white my-1 c">
                    <h5 class="m-0" v-text="item.name"></h5>
                    <hr v-if="index === list_accord" class="mt-2">
                </div>
                <CCollapse :show="index === list_accord">
                    <CCardBody class="px-1">
                        <div v-for="(question, index) in item.checklist_questions" :key="index">
                            <CListGroupItem @click="loadAnswer(list, makeup.id,index)"
                                class="px-0 hover-shadow-sm bg-light mb-2 border-none" style="height: 36px">
                                <div class="row mx-0 pb-2 ">
                                    <div class="col-5">
                                        <p class="text-sm truncate">{{question.name}} </p>
                                    </div>
                                    <div class="col-6">
                                        <p class="text-sm truncate"> {{question.answers}}</p>
                                    </div>
                                    <div class="col-1">
                                        <v-icon name="trash" class="mr-4"></v-icon>
                                    </div>
                                </div>
                            </CListGroupItem>
                        </div>
                    </CCardBody>
                </CCollapse>
            </CListGroupItem>
        </div>
        <hr class="my-3">
        <div>
            <CTabs>
                <CTab  v-for="(part) in checksheet.parts" :key="part.id"
                     :title="part.name" style="min-width: 75px">

                    <CListGroupItem class="mb-2" 
                        v-for="(item, index) in part.checklist" :key="item.id"
                        @click="part_accord = index">
                        <div  
                            class="rounded-md bg-white my-1 c">
                            <h5 class="m-0" v-text="item.name"></h5>
                            <hr v-if="index === part_accord" class="mt-2">
                        </div>
                        <CCollapse :show="index === part_accord">
                            <CCardBody class="px-1">     
                                <div v-for="(question, index) in item.checklist_questions" :key="index">
                                    <CListGroupItem @click="loadAnswer(list, makeup.id,index)"
                                        class="px-0 hover-shadow-sm bg-light mb-2 border-none" style="height: 36px">
                                        <div class="row mx-0 pb-2 ">
                                            <div class="col-5">
                                                <p class="text-sm truncate">{{question.name}} </p>
                                            </div>
                                            <div class="col-6">
                                                <p class="text-sm truncate"> {{question.answers}}</p>
                                            </div>
                                            <div class="col-1">
                                                <v-icon name="trash" class="mr-4"></v-icon>
                                            </div>
                                        </div>
                                    </CListGroupItem>
                                </div>
                            </CCardBody>
                        </CCollapse>
                    </CListGroupItem>
                </CTab>
            </CTabs>
        </div>

        <div >
        </div>
       
         <!-- <AddAnswer v-bind:isanswer="answerNow"  v-bind:item="item" /> -->
    </div>

</template>

<script>
import { mapState } from 'vuex'
import AddAnswer from '../../components/AddAnswer.vue';
export default {
    name: 'Checksheet',

    components: {
        AddAnswer
    },

    props: {
        checksheet: {
            type: Object,
            require: true
        }
    },

    data() {
        return {
            list_accord: 0,
            part_accord: 0,
            answerNow: false, 
            item: {},
        }
    },

    methods: {
        loadAnswer(item, makeup,index){
            this.answerNow = !this.answerNow
            this.item = {
                makeup_group_id: makeup,
                question: item.checklist_questions[index],
                answer: item.answers[index]
            };
        },
    }
}
</script>
