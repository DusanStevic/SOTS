from rest_framework import serializers
from etest.models import *
from django.core.files import File

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__' 

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = '__all__'


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'
class KnowledgeSpaceSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)
    links = LinkSerializer(many=True)
    class Meta:
        model = KnowledgeSpace
        fields = '__all__'
class CreateKnowledgeSpaceSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)
    links = LinkSerializer(many=True)
    def create(self, validated_data):
        nodes = validated_data.pop('nodes')
        links = validated_data.pop('links')
        knowledge_space = KnowledgeSpace.objects.create(**validated_data)
        print(nodes)
        print(links)
        for node in nodes:
            serializer = NodeSerializer(data=node)
            serializer.is_valid(raise_exception=True)
            knowledge_space.nodes.add(serializer.save())
        for link in links:
            serializer = LinkSerializer(data=link)
            serializer.is_valid(raise_exception=True)
            knowledge_space.links.add(serializer.save())
        return knowledge_space
    class Meta:
        model = KnowledgeSpace
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = '__all__'


class CreateQuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    def create(self, validated_data):
        answers = validated_data.pop('answers')
        question = Question.objects.create(**validated_data)
        for answer in answers:
            serializer = AnswerSerializer(data=answer)
            serializer.is_valid(raise_exception=True)
            question.answers.add(serializer.save())

        return question
    class Meta:
        model = Question
        fields = '__all__'

class CreateTestSerializer(serializers.ModelSerializer):
    questions = CreateQuestionSerializer(many=True)

    def create(self, validated_data):
        questions = validated_data.pop('questions')
        test = Test.objects.create(**validated_data)
        for question in questions:
            serializer = CreateQuestionSerializer(data=question)
            serializer.is_valid(raise_exception=True)
            test.questions.add(serializer.save())
        self.generate_ims_qti(test)
        return test

    def generate_ims_qti(self, exam):
        file = File(open(f'./xml/Test{exam.id}.xml', 'a'))

        data = '<?xml version="1.0" encoding="UTF-8"?>'
        data += '\n<qti-assessment-item\n\
            xmlns="http://www.imsglobal.org/xsd/qti/imsqtiasi_v3p0"\n\
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n\
            xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0\n\
                https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd"\n\
            identifier="' + str(exam.id) + '"\n\
            title="' + str(exam.title) + '"\n\
            time-dependent="false"\n\
            xml:lang="en-US">\n\t'


        for question in exam.questions.all():

            correct_answers = '''\n\t<qti-response-declaration base-type="identifier" cardinality="single" identifier="RESPONSE">
        <qti-correct-response>\n\t\t'''
            answers = []
            for answer in question.answers.all():
                answers.append(
                    f'<qti-simple-choice identifier="{answer.id}">{answer.answer_text}</qti-simple-choice>\n\t\t')
                if answer.correct_answer:
                    correct_answers += '\t<qti-value>' + str(answer.id) + '</qti-value>\n\t\t'

            correct_answers += '</qti-correct-response>\n\t</qti-response-declaration>\n\t'

            data += correct_answers

            data += '<qti-outcome-declaration base-type="float" cardinality="single" identifier="SCORE">\n\
        <qti-default-value>\n\
            <qti-value>1</qti-value>\n\
        </qti-default-value>\n\
    </qti-outcome-declaration>\n\t'


            data += '<qti-item-body>\n\t\t<p>'
            data += question.question_text + '</p>\n\t\t'
            data += '<qti-choice-interaction max-choices="' +  str(len(answers)) + '\" min-choices="1" response-identifier="RESPONSE">\n\t\t\t'

            for i in range(len(answers)):
                data += answers[i]
                if i != len(answers) - 1:
                    data += '\t'

            data += '</qti-choice-interaction>\n\t</qti-item-body>\n'
        data += '</qti-assessment-item>'
        file.write(data)
        data = ''

        file.close()

    class Meta:
        model = Test
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Test
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    domain = DomainSerializer(many=False)
    class Meta:
        model = Course
        fields = '__all__'


