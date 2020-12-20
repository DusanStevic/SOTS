from rest_framework import serializers
from etest.models import Course, Domain, KnowledgeSpace,Node,Link

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